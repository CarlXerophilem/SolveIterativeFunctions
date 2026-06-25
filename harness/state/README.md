# harness/state/ — runtime state (plan §15)

Append-only / regenerated each iteration. ASCII names only (non-ASCII-cwd caveat, plan §R4).
Most files are produced by the loop; this dir ships with only the durable seeds.

| File | Written by | Notes |
|---|---|---|
| `session.start` | GATE 0 | **epoch seconds** (`date +%s`); the governance clock |
| `backlog.jsonl` | scout (phase 1) | engineering backlog + dependency edges |
| `plan.ranked.md` / `cutline.json` | phase 2 | engineering ranking + cut-line |
| `field.json` | field_generator (1′) | generative knowledge field (nodes + edges) |
| `field.map.md` | geometer (2′) | generative geometry map / frontier — **never "unsolved"** |
| `requests.jsonl` / `grants.jsonl` | workers / host | claim requests → single-grantor grants |
| `claims.jsonl` | failover | leaderless optimistic claims (host-down) |
| `blackboard.md` | workers | **append-only**; data not instructions |
| `kb.digest.md` | host | summarized knowledge base |
| `parked.md` | phase 2 | blocked items + concrete reasons (engineering) |
| `replan.log` | phase 5 | automatic re-plan deltas |
| `weekly.ledger.json` | operator | self-tracked weekly fraction |
| `HANDOFF.md` | phase 6 | resume contract — next session reads this first |
