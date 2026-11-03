#!/usr/bin/env bash
# Installerer det som trengs for å bygge PDF-ene (Debian/Ubuntu, f.eks. Claude Code på nett).
# Kan også limes inn som «Setup script» i miljøinnstillingene, så går det av seg selv.
set -euo pipefail
if command -v latexmk >/dev/null && kpsewhich tcolorbox.sty >/dev/null && python3 -c "import sympy" 2>/dev/null; then
  echo "LaTeX og sympy er allerede installert."
  exit 0
fi
SUDO=""; [ "$(id -u)" -ne 0 ] && SUDO="sudo"
$SUDO apt-get update -qq
DEBIAN_FRONTEND=noninteractive $SUDO apt-get install -y -qq --no-install-recommends \
  texlive-latex-base texlive-latex-recommended texlive-latex-extra texlive-pictures \
  texlive-fonts-recommended texlive-lang-european latexmk poppler-utils python3-sympy
echo "Ferdig."
