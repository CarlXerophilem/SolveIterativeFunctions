# Ranked plan — engineering mode · 2026-06-20 iteration 1

Score `S = 2·V + E + F + 2·D + C` (plan §5). Frontier is thin (linear dependency chain) — only the top item is schedulable now.

| # | id | S | tier | status | deps | next |
|---|---|---|---|---|---|---|
| 1 | T-engine-fromlocal | 20 | `T0` | 🟢 **granted** | — | in worktree (w1) |
| 2 | T-engine-export | 17 | `T0` | ⏸ blocked | T-engine-fromlocal | unblocks when #1 closes |
| 3 | T-verify | 15 | `T1` | ⏸ blocked | T-solver-presets | end of chain |
| 4 | T-solver-presets | 13 | `T1` | ⏸ blocked | T-solver-input | — |
| 5 | T-solver-input | 13 | `T1` | ⏸ blocked | T-engine-export | — |

**Cut-line:** all 5 in scope for the 300-min budget; topological order forces the chain
`fromlocal → export → input → presets → verify`. See `cutline.json`.
