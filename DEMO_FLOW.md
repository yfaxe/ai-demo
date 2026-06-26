# Demo Flow — Topic 1 Live Demo

> Maps the seeded Fluent data (`src/fluent/`) to each stage's narrative beats.
> Companion to `CLAUDE.md`. Updated 2026-06-26 for the Stage 2 redesign
> (major-incident correlation → **proactive Problem detection**).

**Scope reminder:** this repo only **seeds data**. The Now Assist skills, the Stage 2
agent, and the Stage 3 AI Specialist are configured **in the instance** (see
"What still needs building" at the bottom). All personas, IDs, and document
references are fictional — no Airbus data. App code is **`APP-1B69`** everywhere
(`APP-2T96` is the real code and must never appear).

Scenario timeline anchor: **change CHG0030045 ran the night of 2026-06-22→23**;
incidents span **2026-06-23 → 2026-06-24**. Adjust dates to the rehearsal/demo day
if you want the tickets to read as "today" (search the `.now.ts` files for `2026-06`).

---

## Cast (personas — `personas-data.now.ts`)

| Persona | Role | Used in |
|---|---|---|
| Camille Roux | Caller (Site-North) | Stage 1 — INC0010001 |
| Léa Garnier, Mathis Fontaine, Hugo Mercier, Chloé Dubois, Lucas Girard, Nathan Lopez | Callers across both sites | Stage 2 cluster |
| Théo Bernard (`TBERN02`) | Caller (Site-West) | Stage 3A — INC0010003 |
| Inès Lefèvre | Caller (Site-North) | Stage 3B — INC0010004 |
| Sofia Marchetti | L1 Service Desk | Work-note author |
| Karim Haddad | L2 DocFlow Support | Work-note author |

---

## Stage 1 — Now Assist skills baseline

**Record:** `INC0010001` (`failure / software_issue`, P4, In Progress) + 6 journal entries.

**Story:** Camille Roux's document `QOR-2026-0417` is stuck in **ERROR** — the wrong
workflow template was launched at submission, so PDF/A conversion never validated
and ArchiveX rejected it. Resolution: revert to *In Progress* so she can relaunch
with the correct template. (Modeled on real ticket pattern — wrong workflow → not
PDF/A-compliant → manual revert.)

**Activity stream = signal + noise** (so Summarize has something to earn):
- *Signal:* L1 finds it stuck in ERROR / not a permissions issue (j2); L2 root cause = wrong workflow template, not PDF/A-compliant, KB ref (j5); plan to revert (j6).
- *Noise:* unrelated RT-Library access question (j3); "old template header" + "is there maintenance today?" aside (j4).

**Skills to demo & expected output:**
- **Summarize** → "Document QOR-2026-0417 stuck in Error: wrong workflow template at submission left it non-PDF/A-compliant. Agreed fix: revert to In Progress to resubmit with the correct template."
- **Suggest response** (to Camille) → polite confirmation it's been reverted + PDF/A conversion KB pointer.
- **Close notes / `Solved (Permanently)`** → reverted QOR-2026-0417; advised correct template; shared KB.
- **Beat:** edit one word of the AI draft → *"Human in the lead: the AI drafts, I approve and adjust."*

---

## Stage 2 — Proactive Problem-detection agent

**Records:**
- Cluster: `INC0010010`–`INC0010015` (6 incidents, `failure / software_issue`, P3/P4), all `cmdb_ci = DocFlow Production`, all symptom **"ArchiveX Archive Error"** on publish, spanning 2026-06-23 → 06-24. Two are already **Resolved (Work Around)** (manual convert + relaunch); the rest are In Progress / New.
- CMDB: `DocFlow Production` **depends on** `ArchiveX Service` (+ DB, middleware) — `cmdb-data.now.ts`.
- Change: `CHG0030045` — "Upgrade ArchiveX archival service to v4.2 (PDF/A conversion engine update)", closed Successful on 2026-06-23 01:35, `cmdb_ci = ArchiveX Service` — `change-request-data.now.ts`.

**Story:** Each ticket alone is a low-priority annoyance that L1/L2 band-aid by hand
(see work notes — they even say *"we may need a Problem raised"* but no one connects
the dots). The agent does what no single human did:

1. **Clusters** the 6 incidents by symptom + shared CI (DocFlow Production).
2. **Walks the CMDB** dependency to `ArchiveX Service`.
3. **Correlates** with the recent change on that CI — `CHG0030045`, the v4.2 PDF/A engine upgrade two nights earlier.
4. **Reasons** that the stricter PDF/A-2b checks in the new engine reject documents that previously archived fine → recurring "ArchiveX Archive Error".
5. **Proposes** (for human approval): open a **Problem** linking the 6 incidents, draft proactive comms, recommend a fix (roll back / patch the conversion engine) + KB.

**Why this framing:** authentic to the real queue (recurring archive/PDF errors are
its #1 pattern; it has ~no major incidents), and it doesn't depend on a fragile live
"outage" — the signal is already in the data. **Human-in-the-lead beat:** the agent
*proposes* the Problem; the human approves it.

> The Problem record is intentionally **not seeded** — the agent creating it live is the payoff.

---

## Stage 3 — Autonomous L1 AI Specialist (human oversight)

**Records (fresh, minimal — the agent acts live):**
- `INC0010003` (`access / rights`, P4, New) — Théo Bernard needs **Create** rights in RT-Library. Standard, in-scope → **auto-resolves**: triage → match known pattern → grant role → close with notes.
- `INC0010004` (`access / rights`, P3, New) — Inès Lefèvre requests **bulk Admin** across **all** libraries for **6 external** contractors. Trips guardrails on four axes (privileged + bulk + external + broad scope) → **escalates to a human** with full context, does *not* act.

**Key line:** *"The most important thing this autonomous agent did was decide **not** to act alone."*

Then open the **AI Specialist reporting view**: volume auto-handled vs escalated,
deflection rate, escalation reasons (guardrail categories), improvement trend.

---

## What still needs building (in the instance, not this repo)

1. **Deploy the data:** `now-sdk build` then `now-sdk install` against the demo instance.
2. **Post-deploy verification (important):**
   - Activity stream on INC0010001 shows the 6 entries **backdated** to 2026-06-24 and attributed to the persona names (not "today / admin"). If the install overrode `sys_created_on`/`sys_created_by`, fall back to a Background Script to set them.
   - Personas resolved (caller fields show names, not sys_ids).
   - CMDB dependency view shows DocFlow Production → ArchiveX Service; CHG0030045 is on ArchiveX Service.
3. **Stage 1:** enable the three Now Assist skills (summarize / suggest response / close notes).
4. **Stage 2:** build the proactive Problem-detection agent in Agent Studio — tools to query similar incidents, read CMDB dependencies, read recent changes on a CI, and create a Problem. Tune so it focuses on the ArchiveX cluster (and correctly ignores the unrelated Stage 1 user-error ticket).
5. **Stage 3:** configure the ITSM L1 AI Specialist blueprint + the guardrail policy that forces escalation on privileged/bulk/external/broad-scope access requests; confirm the reporting dashboard is populated.
6. **Rehearse Stage 2** (highest risk).
