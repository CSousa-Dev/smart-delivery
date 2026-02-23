#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 3 ]]; then
  echo "Uso: $0 <output-path> <domain-title> <module-context>"
  echo "Exemplo: $0 specs/modules/cart/cart.domain.md Cart cart"
  exit 1
fi

output_path="$1"
domain_title="$2"
module_context="$3"
template_path="specs/templates/domain-definition-template.md"
today="$(date +%Y-%m-%d)"

if [[ ! -f "$template_path" ]]; then
  echo "Template nao encontrado: $template_path"
  exit 1
fi

if [[ -f "$output_path" ]]; then
  echo "Arquivo ja existe: $output_path"
  echo "Abortado para evitar sobrescrita."
  exit 1
fi

mkdir -p "$(dirname "$output_path")"

awk \
  -v title="$domain_title" \
  -v created="$today" \
  -v context="$module_context" \
  '
  $0 == "# Domain Definition: [NOME DA ENTIDADE OU CONCEITO]" { $0 = "# Domain Definition: " title }
  $0 == "**Created**: [DATE]  " { $0 = "**Created**: " created "  " }
  $0 == "**Module/Context**: [EX: cart / orders / auth]  " { $0 = "**Module/Context**: " context "  " }
  $0 == "**Status**: [Draft | Approved | Deprecated]" { $0 = "**Status**: Draft" }
  { print }
  ' "$template_path" > "$output_path"

echo "Domain Definition criada em: $output_path"
