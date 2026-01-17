# Identity Context - Security & Token Strategy

**Created**: 2025-12-29

**Project**: `specs/project.md`

**Context**: Identity

---

## Purpose

Este documento registra **decisões técnicas explícitas** relacionadas a:

- Proteção de credenciais
- Emissão e verificação de tokens de autenticação

O objetivo é **viabilizar implementação consistente**, evitando ambiguidades e decisões implícitas durante o desenvolvimento.

Este documento **não descreve fluxos**, **não repete specs**, e **não define comportamento de negócio**.

---

## Scope

Este documento se aplica exclusivamente ao **contexto Identity** e às seguintes capabilities:

- Register User Credentials
- Authenticate User
- Authorize Access (verify identity)
- Invalidate Authorization (token revocation)

---

## Credential Hashing Strategy

### Decision

Utilizar **Argon2id** como algoritmo padrão para hashing de credenciais sensíveis.

---

### Rationale

Argon2id foi escolhido com base nos seguintes critérios técnicos:

- ✅ **Resistência a ataques por GPU**
- ✅ **Proteção contra side-channel attacks**
- ✅ **Parâmetros explícitos e configuráveis**
- ✅ **Recomendado por padrões modernos de segurança**
- ✅ **Vencedor do Password Hashing Competition (PHC)**

Comparativamente:

| Algoritmo | Motivo de não escolha |
| --- | --- |
| bcrypt | Vulnerável a paralelização em GPU |
| bcryptjs | Performance inferior (pure JS) |
| pbkdf2 | Fácil configuração incorreta |
| scrypt | Mais complexo sem ganho claro |

---

### Usage Constraints

- Segredos **nunca** devem ser armazenados ou logados em texto plano
- Hashing ocorre **exclusivamente na Infrastructure**
- Domain e Application **não conhecem** algoritmo, parâmetros ou biblioteca
- Parâmetros (memória, iterações, paralelismo) são definidos via configuração de infraestrutura

---

### Dependency

- Biblioteca Node.js compatível com Argon2id
    
    (ex: implementação nativa de argon2)
    

---

## Authentication Token Strategy

### Decision

Utilizar **JWT assinado com chave assimétrica (RS256)** como token de autenticação.

---

### Rationale

A escolha por JWT (RS256) atende aos seguintes requisitos:

- ✅ **Stateless** (não requer persistência de sessão)
- ✅ **Verificação local por múltiplos consumidores**
- ✅ **Separação clara entre emissão e verificação**
- ✅ **Evita compartilhamento de segredo**
- ✅ **Boa interoperabilidade com outros módulos**

Comparativamente:

| Estratégia | Motivo de não escolha |
| --- | --- |
| JWT HS256 | Chave simétrica compartilhada |
| Tokens opacos | Requer estado central |
| Sessions | Não escala bem |
| PASETO | Menor adoção/ecossistema |

---

### Token Semantics

O token de autenticação **DEVE**:

- Identificar unicamente a identidade autenticada (`userId`)
- Conter timestamps técnicos (`iat`, `exp`)
- Ser tratado como **opaco** fora do Identity

O token **NÃO DEVE**:

- Conter regras de acesso
- Conter semântica de domínio (tenant, BU, etc.)
- Ser interpretado fora do Identity

---

### Usage Constraints

- Emissão do token ocorre **somente** no Identity
- Verificação ocorre na Infrastructure (Identity ou consumidores)
- Application recebe apenas `userId` derivado
- Domain não conhece tokens

---

### Dependency

- Biblioteca JWT compatível com RS256
    
    (ex: `jose`, `jsonwebtoken`, ou equivalente)
    

---

## Authorization Boundary

- Tokens **não carregam regras de acesso**
- Autorização aqui significa **apenas verificação de identidade**
- Token serve apenas para **identificação da identidade**
- Revogação de token exige **Invalidate Authorization**

---

## Operational Considerations

### Rotation & Expiration

- Chaves privadas de assinatura devem permitir rotação
- `exp` deve ser configurável
- Tokens expirados **não** são renovados automaticamente

---

### Observability

- Falhas de autenticação devem ser logadas
- Nunca logar segredos ou hashes
- Tokens **não** devem ser logados em produção

---

## Non-Goals

Este documento **não define**:

- Fluxos de login
- Endpoints HTTP
- Políticas de senha
- Regras de autorização
- Integrações externas

Esses aspectos pertencem aos **specs** e **designs específicos**.

---

## Summary

- Credenciais: **Argon2id**
- Tokens: **JWT RS256**
- Identity permanece:
    - Stateless
    - Sem autorização embutida
    - Sem vazamento de domínio
- Decisões suficientes para **implementar com segurança**
