#!/usr/bin/env bash
# budget-gate.sh — auto-dev wall-clock governance hook (Stop / PreToolUse).
# Pilot copy of auto-dev/hooks/budget-gate.sh (self-contained so a second laptop
# that only clones the project repo still has it).
#
# HONEST PROXY: gauges ELAPSED WALL-CLOCK against config/budget.json targets.
# It does NOT read account usage. Emits {"systemMessage": "..."} and exits 0.
# state/session.start must hold EPOCH SECONDS (date +%s > state/session.start).
# Windows: invoke via "C:/Program Files/Git/bin/bash.exe" hooks/budget-gate.sh /abs/harness
set -u

HARNESS="${1:-${AUTO_DEV_HOME:-}}"
if [ -z "${HARNESS}" ]; then
  HERE="$(cd "$(dirname "${BASH_SOURCE[0]:-$0}")" && pwd)"
  HARNESS="$(cd "${HERE}/.." && pwd)"
fi
START_FILE="${HARNESS}/state/session.start"
BUDGET_FILE="${HARNESS}/config/budget.json"

emit() { printf '{"systemMessage":"[budget-gate:%s] %s"}\n' "$1" "$2"; }

[ -f "${START_FILE}" ]  || exit 0
[ -f "${BUDGET_FILE}" ] || exit 0

num() {
  local v
  v="$(grep -oE "\"$1\"[[:space:]]*:[[:space:]]*[0-9.]+" "${BUDGET_FILE}" 2>/dev/null \
        | grep -oE '[0-9.]+' | head -n1)"
  [ -n "${v}" ] && printf '%s' "${v}" || printf '%s' "$2"
}

START="$(tr -dc '0-9' < "${START_FILE}" | head -c 20)"
[ -n "${START}" ] || exit 0
NOW="$(date +%s)"
MIN="$(num session_budget_minutes 300)"
WARN="$(num warn_at_elapsed_fraction 0.70)"
STOP="$(num hard_stop_at_elapsed_fraction 0.90)"

OUT="$(awk -v now="${NOW}" -v start="${START}" -v min="${MIN}" -v warn="${WARN}" -v stop="${STOP}" 'BEGIN{
  total=min*60; if(total<=0){print "ok|elapsed unknown"; exit}
  f=(now-start)/total; pf=int(f*100+0.5);
  if(f>=stop)      printf("stop|%d%% elapsed: hard-stop - write HANDOFF, finish open T0, then exit", pf);
  else if(f>=warn) printf("warn|%d%% elapsed: shed T2/T3, finish open T0/T1 only", pf);
  else             printf("ok|%d%% elapsed: budget ok, continue", pf);
}')"
LEVEL="${OUT%%|*}"
MSG="${OUT#*|}"
emit "${LEVEL}" "${MSG}"
exit 0
