# Node TypeScript Base Template

Template base para criação de APIs backend com Node.js e TypeScript usando Express.

## 📋 Características

- ✅ TypeScript com configuração strict
- ✅ Express.js para criação de APIs REST
- ✅ Sistema de logging com Pino
- ✅ Middlewares de segurança (Helmet, CORS)
- ✅ Tratamento de erros centralizado
- ✅ Estrutura modular e escalável
- ✅ Configuração de ambiente com dotenv

## 🚀 Início Rápido

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie o arquivo `.env.example` para `.env` e ajuste as variáveis conforme necessário:

```bash
cp .env.example .env
```

### 3. Executar em desenvolvimento

```bash
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### 4. Build para produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
node-ts-base/
├── src/
│   ├── config/
│   │   └── environment.ts      # Configurações da aplicação
│   ├── shared/
│   │   ├── logger/             # Sistema de logging
│   │   ├── middlewares/        # Middlewares do Express
│   │   ├── types/              # Tipos TypeScript compartilhados
│   │   └── utils/              # Utilitários compartilhados
│   ├── modules/                # Módulos da aplicação (adicionar aqui)
│   ├── app.ts                  # Configuração do Express
│   └── server.ts               # Ponto de entrada do servidor
├── logs/                       # Arquivos de log (gerado automaticamente)
├── dist/                       # Build de produção (gerado automaticamente)
├── package.json
├── tsconfig.json
└── README.md
```

## 🏗️ Adicionando Módulos

Para adicionar um novo módulo, crie uma pasta dentro de `src/modules/` seguindo a estrutura:

```
modules/
└── meu-modulo/
    ├── domain/          # Entidades e regras de negócio
    ├── infrastructure/  # Implementações técnicas (repositórios, etc)
    ├── presentation/    # Controllers, DTOs e rotas
    └── module.ts        # Arquivo de registro do módulo
```

Exemplo de `module.ts`:

```typescript
import { Application } from 'express';
import { router } from './presentation/routes';

export function registerModule(app: Application): void {
  app.use('/api/v1/meu-modulo', router);
}
```

E então registre no `app.ts`:

```typescript
import { registerModule } from './modules/meu-modulo/module';

// Dentro de createApp()
registerModule(app);
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor em modo desenvolvimento com hot-reload
- `npm run build` - Compila o TypeScript para JavaScript
- `npm start` - Inicia o servidor em produção (requer build prévio)
- `npm test` - Executa os testes
- `npm run lint` - Verifica problemas de linting
- `npm run lint:fix` - Corrige problemas de linting automaticamente
- `npm run format` - Formata o código com Prettier

## 📝 Variáveis de Ambiente

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `NODE_ENV` | Ambiente de execução | `development` |
| `PORT` | Porta do servidor | `3000` |
| `CORS_ORIGIN` | Origem permitida para CORS | `*` |
| `API_PREFIX` | Prefixo da API | `/api` |
| `API_VERSION` | Versão da API | `v1` |
| `LOG_LEVEL` | Nível de log (info, debug, warn, error) | `info` |

## 🔍 Health Check

O servidor possui uma rota de health check disponível em:

```
GET /health
```

Resposta:
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

## 📚 Recursos Compartilhados

### Logger

```typescript
import { getLogger } from './shared/logger';

const logger = getLogger();
logger.info('Mensagem informativa', { metadata: 'opcional' });
logger.error('Erro ocorrido', { error: errorObject });
```

### AppError

```typescript
import { AppError } from './shared/utils/AppError';

throw AppError.notFound('Recurso não encontrado');
throw AppError.badRequest('Dados inválidos', 'INVALID_DATA');
```

### ApiResponse

```typescript
import { successResponse, errorResponse } from './shared/types/ApiResponse';

res.json(successResponse({ id: 1, name: 'Test' }));
res.json(errorResponse('Erro ao processar', 'PROCESSING_ERROR'));
```

## 📄 Licença

MIT

