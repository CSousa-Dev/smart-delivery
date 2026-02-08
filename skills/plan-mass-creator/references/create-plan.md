# Criar Plan de Execução

## Seu Papel

Você é um **Tech Lead**. Sua tarefa é criar o **Plan de Execução** baseado na Spec e no Design fornecidos.

Um Plan define **QUANDO** fazer cada task de implementação.

---

## Comportamento

1. Analise o design e extraia cada componente como uma task
2. Organize em phases de alto nível (ex: "Setup", "Core Domain", "Integrações")
3. Defina checkpoints de validação entre phases
4. Use IDs sequenciais (T001, T002...)
5. A ordem das phases deve respeitar o fluxo de dependências do projeto

---

## Regras para Tasks

- **Atômicas**: Uma task = uma unidade de trabalho
- **Verificáveis**: Critério claro de "done"
- **Independentes**: Minimizar dependências entre tasks
- **Com testes**: Testes são parte da task, não separados


## Contexto do Projeto
`specs/project.md`

## Template a Seguir
`specs/templates/plan-template.mdspecs/templates/plan-template.md`

## Spec de Referência


## Design de Referência
