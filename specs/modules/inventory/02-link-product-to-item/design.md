# Design: Link Product to Inventory Item

**Created**: 2026-01-12  
**Status**: Deprecated no inventory (moved to production)  
**Spec**: [./spec.md](./spec.md)  
**Project**: [../../../project.md](../../../project.md)

---

## Scope Update

O inventory e agnostico de produto. O vinculo produto-item e responsabilidade do
modulo de producao.

Este design nao se aplica mais ao inventory.

---

## Impact

- Entidades, ports e adapters relacionados a produto nao pertencem ao inventory.
- Endpoints de vinculo (`/inventory/product-item-links`) deixam de existir neste modulo.
