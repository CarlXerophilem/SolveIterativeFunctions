# LAUNCH note — read ONCE at launch (the only human touchpoint, plan §8)

- **Operator / laptop id:** <fill in, e.g. laptopA>
- **Loop engine:** choose in `../auto-dev/references/loop-setup.md` — native `/loop` dynamic OR ralph Stop hook.
- **Mode:** auto (the classifier in `config/mode.json` reads `GOAL.md`; honors a `Mode hint:` line).

**Budget:** see `config/budget.json`. These are *targets*, not a read of the account cap (plan §9).
After this session, run `/usage` and record the real remaining % in the NEXT launch note — **the human
is the only real usage sensor.**

**Generative demo:** a terse seed lives in `GOAL.generative.md`; to run research mode, point the
classifier there (or set `Mode hint: generative`).

**Corrections:** edit `GOAL.md` / `config/*` and **relaunch from `state/HANDOFF.md`**. No mid-session
prompts — the loop runs autonomously after launch. A hard-stop (Esc / kill) is the only live valve.
