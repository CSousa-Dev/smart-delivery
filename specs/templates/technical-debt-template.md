# Technical Debt Template — Prompt Content Creation

Use this template to register technical debt (bugs/constraints) impacting the prompt creation capability. Each item should be folded into future spec/design/plan iterations.

## Identification
- Title:
- Date:
- Reporter:
- Environment (dev/stage/prod):
- Endpoint/flow: `POST /prompts` or other

## Description
- Current behavior:
- Expected behavior:
- Impact (risk/severity):

## Reproduction
1) Preconditions (data, DB state, env vars)
2) Request/payload/steps
3) Observed response/error (HTTP status, payload, logs)

## Evidence
- Logs (relevant snippets)
- Payloads used
- Screenshots (if any)

## Proposed Fix
- Business rule change summary
- Technical changes (layer: domain/application/infrastructure)
- Required tests (unit, integration, e2e)

## Follow-up
- Items to add to spec/design/plan
- Pending decisions / questions
