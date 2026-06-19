#!/usr/bin/env bash
# cross-verify.sh — auto-dev cross-model verifier bridge (deep-reasoning loop §6.2).
# Pilot copy of auto-dev/hooks/cross-verify.sh.
#
# Sends a verification PROMPT to an INDEPENDENT model (no-anchoring). Provider via
# $AUTO_DEV_CROSS_MODEL + the matching API key. If none available, prints
# "CROSS_MODEL_AVAILABLE=none ..." and exits 2 → caller falls back to the
# devil's-advocate panel. NEVER blocks the loop.
#   Usage:  cross-verify.sh "verification prompt"   (or pipe on stdin)
set -u

PROMPT="${1:-}"
[ -z "${PROMPT}" ] && PROMPT="$(cat 2>/dev/null || true)"
[ -z "${PROMPT}" ] && { echo "CROSS_MODEL_AVAILABLE=none (empty prompt)"; exit 2; }
MODEL="${AUTO_DEV_CROSS_MODEL:-}"

json_escape() {
  python3 -c 'import json,sys; print(json.dumps(sys.stdin.read()))' 2>/dev/null \
    || node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>process.stdout.write(JSON.stringify(s)))'
}
extract() { python3 -c "import json,sys
d=json.load(sys.stdin)
print($1)" 2>/dev/null || cat; }
P="$(printf '%s' "${PROMPT}" | json_escape)"
SYS="You are an independent verification assistant. You did NOT write the work under review. Find the most serious weaknesses; if rigorous, say so explicitly."

case "${MODEL}" in
  deepseek*)
    [ -n "${DEEPSEEK_API_KEY:-}" ] || { echo "CROSS_MODEL_AVAILABLE=none (no DEEPSEEK_API_KEY)"; exit 2; }
    curl -s https://api.deepseek.com/chat/completions \
      -H "Authorization: Bearer ${DEEPSEEK_API_KEY}" -H "Content-Type: application/json" \
      -d "{\"model\":\"${MODEL}\",\"temperature\":0.1,\"max_tokens\":2000,\"messages\":[{\"role\":\"system\",\"content\":$(printf '%s' "${SYS}" | json_escape)},{\"role\":\"user\",\"content\":${P}}]}" \
      | extract 'd["choices"][0]["message"]["content"]'
    ;;
  gpt-5*|gpt*)
    [ -n "${OPENAI_API_KEY:-}" ] || { echo "CROSS_MODEL_AVAILABLE=none (no OPENAI_API_KEY)"; exit 2; }
    curl -s https://api.openai.com/v1/chat/completions \
      -H "Authorization: Bearer ${OPENAI_API_KEY}" -H "Content-Type: application/json" \
      -d "{\"model\":\"${MODEL}\",\"temperature\":0.1,\"max_tokens\":2000,\"messages\":[{\"role\":\"system\",\"content\":$(printf '%s' "${SYS}" | json_escape)},{\"role\":\"user\",\"content\":${P}}]}" \
      | extract 'd["choices"][0]["message"]["content"]'
    ;;
  gemini*)
    [ -n "${GOOGLE_AI_API_KEY:-}" ] || { echo "CROSS_MODEL_AVAILABLE=none (no GOOGLE_AI_API_KEY)"; exit 2; }
    curl -s "https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GOOGLE_AI_API_KEY}" \
      -H "Content-Type: application/json" \
      -d "{\"contents\":[{\"parts\":[{\"text\":${P}}]}],\"generationConfig\":{\"temperature\":0.1,\"maxOutputTokens\":2000}}" \
      | extract 'd["candidates"][0]["content"]["parts"][0]["text"]'
    ;;
  *)
    echo "CROSS_MODEL_AVAILABLE=none (set AUTO_DEV_CROSS_MODEL to deepseek-*, gpt-*, or gemini-*)"
    exit 2
    ;;
esac
