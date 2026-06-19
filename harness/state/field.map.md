# Field map — generative mode · 2026-06-20 (bounded dry-run)

**Seed:** *Does every real-analytic F with a fixed point of multiplier λ (|λ|≠0,1) admit a real-analytic half-iterate, and when is it unique?*

> **IRON RULE (plan §7.2):** no node is labeled `unsolved`/`impossible`/`failed`. Every node is
> **positioned by geometry**. Edges are LLM-judged associations (no embeddings key — coords are
> associative placeholders, R12).

## Verified component (landmarks / anchors)

| node | what it anchors |
|---|---|
| `L-koenigs` | Koenigs linearization (hyperbolic) — the cluster's center |
| `L-halfiter-pos` | half-iterate exists for **λ>0** via √λ·φ (constructive) |
| `A-schroeder` | the in-repo implementation (`engine.js` Schröder path) — tested |
| `O-parabolic` | the excluded |λ|=1 boundary, anchored by the Fatou path (x²−x+1@1 ≈ 2.4e-14) |
| `AN-matrix-sqrt` | linear-algebra mirror of the λ-sign parity condition |

## The seed's location (`FRONT-conj`) — a geometry, not a verdict

`frontier_tier: frontier` · `frontier_distance: 1` · cluster `local-conjugacy`.

The seed does **not** resolve to yes/no. Its honest position is a **case-geometry**:

- **λ > 0** — essentially **anchored**: 1 hop from `L-halfiter-pos` / `A-schroeder` (`semantic_dist ≈ 0.12`). Existence holds and is implemented.
- **λ < 0** — meets a genuine **obstruction** `O-neg-lambda` (no real √λ): the *unrestricted* claim is **false as stated**, so the real object of interest is the **boundary** between the λ>0 and λ<0 regions.
- **uniqueness** — a **near-landmark** lemma `LE-uniqueness` (one short rigidity argument from Koenigs).
- **|λ| = 1** (excluded) — the adjacent `O-parabolic` region, handled by a different (Fatou) technique.

**Most promising bridges / frontier moves**
1. Promote `LE-uniqueness` to a landmark (short rigidity proof) → uniqueness for λ>0 becomes anchored.
2. Sharpen `O-neg-lambda`: characterize exactly which λ<0 germs admit a half-iterate after passing to F∘F (period-2) — turns the obstruction into a refined sub-statement.
3. Use `AN-matrix-sqrt` to transfer the even-multiplicity parity condition as a conjectured criterion.

**Computational evidence already in hand:** `engine.js` reproduces λ>0 (x²−2@2) and the excluded parabolic λ=1 (x²−x+1@1, residual ≈ 2.4e-14); λ=−1 exhibits the real-branch obstruction.

> **Deliverable framing (plan §7.5):** the harness ships *this map* — where the problem sits, what
> anchors it, where the genuine gap/obstruction is, and the cheapest frontier moves — and never a
> "solved/unsolved" line.
