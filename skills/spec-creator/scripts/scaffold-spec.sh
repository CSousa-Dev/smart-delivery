#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 2 ]]; then
  echo "Uso: $0 <diretorio-da-capability> <nome-da-capability>"
  exit 1
fi

target_dir="$1"
capability_name="$2"
template_path="specs/templates/spec-template.md"
output_path="${target_dir%/}/spec.md"
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

mkdir -p "$target_dir"

awk \
  -v capability="$capability_name" \
  -v created="$today" \
  '
  $0 == "# Capability: [NOME]" { $0 = "# Capability: " capability }
  $0 == "**Created**: [DATE]  " { $0 = "**Created**: " created "  " }
  $0 == "**Project**: [specs/project.md](../project.md)" { $0 = "**Project**: `specs/project.md`" }
  { print }
  ' "$template_path" > "$output_path"

echo "Spec criada em: $output_path"
