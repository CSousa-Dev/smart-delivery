# Vertical: fonte única e fronteira entre módulos

## Situação atual (após implementação)

**Implementado:** O módulo de **Organization** não possui mais tabela própria `verticals`. A definição de vertical permanece apenas no módulo **Attributes** (fonte única). Organization guarda apenas **código** de vertical em `organization_verticals` e `business_unit_verticals` (coluna `vertical_code`).

| Onde | Banco | Uso |
|------|--------|-----|
| **Attributes** | `DATABASE_URL_ATTRIBUTES` | Tabela `verticals`. Base para categorias, atributos por vertical, configuração de catálogo. |
| **Organization** | `DATABASE_URL_ORGANIZATION` | Apenas **referência por código**: `organization_verticals.vertical_code`, `business_unit_verticals.vertical_code`. Listagem e validação de verticais via port/adapter que consome Attributes. |

O módulo de **products** usa:
- **Category** (attributes): `category.verticalCode` e `category.verticalId` (vertical do catálogo).
- **BusinessUnit** (organization): `activeVerticalCodes` → códigos das verticais ativas da BU.

Na criação de produto, a regra é: a categoria pertence a um vertical cujo **código** deve estar entre os verticais ativos da BU (`businessUnit.activeVerticalCodes.includes(category.verticalCode)`). O alinhamento é por **código**, com Attributes como fonte única da definição de vertical.

---

## Onde deveria viver “vertical”?

- **Vertical** = linha de negócio que estrutura o catálogo (categorias, atributos por vertical).  
- **Fonte única** = módulo de **Attributes** (ou um núcleo compartilhado de dados de referência).  
- **Organization** = apenas guarda “esta organização/BU atua nestes verticais”, usando **ids** que são válidos no contexto de atributos.

Ou seja:
- Quem **cria, altera, lista e desativa** verticais é o **Attributes**.
- Quem **usa** vertical como referência (org/BU atua no vertical X) é o **Organization**, sem ter sua própria tabela `verticals`.

---

## Caminhos possíveis

### 1. Organization consome Attributes para vertical (recomendado)

- **Organization** deixa de ser “dono” da tabela `verticals` no seu banco.
- **Listar verticais** e **validar verticalIds** no organization passam a usar o módulo de attributes (port + adapter: HTTP ou repositório compartilhado).
- No banco organization:
  - **Opção A**: remover a tabela `Vertical` e a FK em `organization_verticals` / `business_unit_verticals`; manter apenas `verticalId` (UUID) como referência. Validação “existe este vertical?” feita via adapter em attributes.
  - **Opção B**: manter uma tabela de **cache/denormalização** (ex.: `vertical_references`) só com `id`, `name`, `code` para exibição, preenchida por um job de sincronização a partir de attributes. A **fonte da verdade** continua em attributes.

Vantagens: uma única fonte de verdade (attributes), sem duplicar conceito; cadastro de organização e de produto passam a usar o mesmo “catálogo” de verticais.

### 2. Módulo compartilhado / kernel

- Criar um módulo (ou schema/banco) “reference” ou “kernel” que possui apenas `verticals`.
- Attributes e Organization referenciam esse módulo (via API ou DB compartilhado).

Vantagem: separação explícita de “dado de referência”. Custo: novo módulo/schema e possível compartilhamento de DB ou nova API.

### 3. Manter duplicado com sync explícito

- Manter as duas tabelas e um processo (job/evento) que replica attributes.verticals → organization.verticals.

Ainda assim o **conceito** continua duplicado; só reduzimos o risco de divergência. Não resolve a questão conceitual.

---

## Recomendações práticas (implementadas)

1. **Attributes como dono de Vertical**  
   Listagem e validação de verticais no fluxo de organização usam o módulo de attributes via **VerticalCatalogPort** e **AttributesVerticalCatalogAdapter**.

2. **Organization trata vertical como referência por código**  
   - Create Organization / Link vertical: uso de **`verticalCodes`**; validação contra o catálogo (attributes).  
   - List Verticals: `GET /api/organization/verticals` delegado ao catálogo (attributes); resposta com `code`, `name`, `description` (sem `id`).

3. **Banco organization**  
   - Tabela `verticals` removida.  
   - `organization_verticals` e `business_unit_verticals` usam **`vertical_code`** (VARCHAR), sem FK para tabela de vertical.

4. **Produtos**  
   - Comparação por **código**: `businessUnit.activeVerticalCodes.includes(category.verticalCode)`; categoria continua expondo `verticalId` para o port de validação de atributos quando necessário.

---

## Resumo

- **Implementado:** Organization não possui mais tabela `verticals`; consome “lista de verticais” e “códigos válidos?” do módulo Attributes e guarda apenas **`vertical_code`** em `organization_verticals` e `business_unit_verticals`.
