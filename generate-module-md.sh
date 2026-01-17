#!/usr/bin/env bash
set -euo pipefail

# Opcional: passe o caminho raiz do repo como primeiro argumento.
ROOT="${1:-$(cd "$(dirname "$0")" && pwd)}"
BASE="$ROOT/specs/modules"

if [ ! -d "$BASE" ]; then
  echo "Base não encontrada: $BASE" >&2
  exit 1
fi

find "$BASE" -mindepth 1 -maxdepth 1 -type d | while IFS= read -r module_dir; do
  module="$(basename "$module_dir")"
  out="$module_dir/$module.md"
  {
    echo "# $module"

    # Inclui arquivos Markdown da raiz do módulo (exceto o output).
    for root_md in "$module_dir"/*.md; do
      [ -e "$root_md" ] || break
      [ "$root_md" = "$out" ] && continue
      echo
      echo "## $(basename "$root_md" .md)"
      cat "$root_md"
    done

    # Para cada capability (subpasta), agrega seus arquivos conhecidos.
    find "$module_dir" -mindepth 1 -maxdepth 1 -type d | sort | while IFS= read -r cap_dir; do
      cap="$(basename "$cap_dir")"
      echo
      echo "## $cap"
      for f in design.md design-validation.md spec.md spec-validation.md; do
        if [ -f "$cap_dir/$f" ]; then
          echo
          echo "### ${f%.md}"
          cat "$cap_dir/$f"
        fi
      done
    done
  } > "$out"
  echo "gerado $out"
done


