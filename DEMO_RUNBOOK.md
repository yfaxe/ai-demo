# Demo Runbook — Topic 1 Live Demo

> Presenter's click-by-click script for the three live stages.
> Data map lives in `DEMO_FLOW.md`; this is the *delivery* script.
> Narrative arc: **AI skills assisting humans → agentic reasoning across records → autonomous specialist under human oversight.** Echo **"Human in the Lead"** at every approval/edit/escalation beat.

**Target instance:** `https://accenturefrancedemo1.service-now.com` (Australia release). Portable to any AI-Agent-enabled instance. Total runtime ≈ 22–28 min (Stage 1 ~6, Stage 2 ~8, Stage 3 ~8, intro/outro ~3).

**Agent strategy (decided 2026-06-26):** Stage 2 runs **OOB agents as the lead**, with our custom agent as a deterministic backup. Stage 3 runs our **custom guardrail agent as the hero**, with an OOB resolution agent shown beside it. Both custom agents now **install from this app** (no hand-building in the UI).

---

## 0. Prerequisites — what must be true before you present

**Installed by this app (`now-sdk install`):**
- Demo data: incidents, journal history, CMDB CIs + relationships, change `CHG0030045`, personas.
- Both **custom AI Agents**: `DocFlow Proactive Problem Detection` (Stage 2 backup) and `DocFlow L1 Access Request Specialist` (Stage 3 hero) — with their tools, versions, and ACLs.

**Verified present on `accenturefrancedemo1` (2026-06-26):** Australia release; AI Agent Studio active (`sn_aia_*` — 135 prebuilt agents, 47 use cases); the OOB agents named below exist.

**Still to confirm / configure in the instance (NOT in this repo):**
- [ ] **Now Assist for ITSM** generative skills provisioned + active: *Incident Summarization*, *Resolution/close-notes*, *response drafting*. Presenter has `now_assist`/`sn_now_assist_*` roles.
- [ ] **Activate/publish** the two installed custom agents (confirm version state = published after install).
- [ ] **Activate the OOB use cases/agents** used below (Stage 2 lead + Stage 3 showcase).
- [ ] **Autonomy setting**: confirm `autopilot` tool execution is permitted (Stage 3 auto-resolves without a click). If autopilot is gated, the agent will ask to confirm — rehearse whichever applies.
- [ ] Pre-run the agents a few times so any **analytics/dashboard** view isn't empty.

**Pre-flight (day before AND 30 min before):**
1. `cd .../ai-demo && now-sdk build && now-sdk install` → deploys data **and** both custom agents.
2. **Verify INC0010001's activity stream**: 6 entries dated 2026-06-24, authored by Camille Roux / Sofia Marchetti / Karim Haddad — *not* "now / admin". If collapsed to today, fix with a Background Script before the demo.
3. Verify cluster INC0010010–INC0010015 all read **"ArchiveX Archive Error"**; CMDB shows **DocFlow Production → ArchiveX Service**; **CHG0030045** closed on ArchiveX Service.
4. **Pre-open tabs** (in order): (a) incident list filtered to the cluster, (b) INC0010001, (c) AI Agent Studio (Stage 2 agents), (d) INC0010003, (e) INC0010004, (f) AI Agent analytics view.
5. Projector hygiene: zoom ~125–150%, close notifications/Teams, light theme, hide bookmarks bar.

> **Reset between rehearsals:** `now-sdk install --reinstall` re-syncs data + agents to local definitions (warning: wipes on-instance-only changes — fine here). Then undo what the agents did last run: delete the **Problem** created in Stage 2 and unlink its incidents; re-open **INC0010003** (the Stage 3 auto-resolve); clear the escalation note + reset state on **INC0010004**.

---

## Opening (30 sec)

> "Most enterprises today are *here* — AI assists, a human does the work. Over the next 20 minutes I'll walk that line forward: assistant → agent that reasons across our systems → an autonomous specialist that knows when to act and, crucially, when **not** to. The human stays in the lead the whole way."

---

## Stage 1 — Now Assist skills (the assistant baseline) · ~6 min

**Open:** INC0010001 — *"DocFlow — document blocked in Error status."*

1. **Set the scene (30s).** Scroll the activity stream. "A real ticket: messy. A stuck document, an urgent comment, L1/L2 notes, and noise — an unrelated access question, a 'is there maintenance?' aside. A human has to read all of it."
2. **Summarize (90s).** Now Assist panel → **Summarize**. Read it aloud: "It pulled the signal — wrong workflow template, not PDF/A-compliant, plan is to revert — and dropped the noise."
3. **Suggest a response (90s).** In the customer comments, trigger **Now Assist → draft response**. A polite reply to Camille appears. **➤ HUMAN-IN-THE-LEAD BEAT:** edit one word before sending. *"The AI drafts; I approve and adjust. I'm in the lead."*
4. **Resolve + close notes (90s).** Move toward Resolved; **Generate close notes**; close code **Solved (Permanently)**. "Three skills, human-supervised. Useful — but it only ever looked at *this one ticket*."

*Fallback:* if a skill is slow/odd, narrate the expected output (in `DEMO_FLOW.md`) and move on — don't fight it live.

---

## Stage 2 — Proactive Problem detection (now it reasons) · ~8 min · ⚠️ HIGHEST RISK

**Open:** the incident list filtered to the cluster (INC0010010–INC0010015).

1. **Show the pattern a human would miss (60s).** "Six tickets, different people, both sites, last 24 hours — all 'ArchiveX Archive Error'. Two already fixed... by hand: convert, relaunch archiving. Band-aids. No one connected them — each L1 only sees their own ticket."

### Path A — OOB agents (lead). *"This ships in the box."*
2. **Detect the cluster.** Run the OOB **`Analyze incident trends`** use case / **`Incident trends analyzer`** — *"retrieve incident clusters, identify recurring issues and root causes."* Narrate it surfacing the ArchiveX cluster + recommendation.
3. **Investigate root cause.** Run the OOB **`Problem investigator`** / **`Investigate problems`** — it analyzes the associated incidents, **similar incidents, change requests, and affected CIs**, and lands on `CHG0030045` (the ArchiveX v4.2 PDF/A engine upgrade).
4. **Link + propose.** Use **`Link incident to problem`** to tie the cluster to a Problem. **➤ HUMAN-IN-THE-LEAD BEAT:** you review and approve the Problem/root cause. "ServiceNow's own agents did the cross-record reasoning — I approve the result."

> **Data-fit to confirm in rehearsal:** `CHG0030045` is on the **dependency** CI (ArchiveX Service), not on DocFlow Production. If the OOB investigator only inspects the incident's own CI and misses the change, we add a change on **DocFlow Production** so it correlates cleanly. *(Validate on install/test.)*

### Path B — custom agent (backup). *One agent, end-to-end, fully scripted.*
2b. Open **`DocFlow Proactive Problem Detection`** in AI Agent Studio and run it. Narrate the reasoning trail:
   - **Clusters** the 6 incidents by symptom + shared CI → *DocFlow Production*.
   - **Walks the CMDB** → DocFlow Production **depends on → ArchiveX Service**.
   - **Finds** `CHG0030045` (ArchiveX v4.2 PDF/A upgrade), closed two nights before the errors began.
   - **Proposes** a Problem + comms + KB and **stops for your approval** (the create step runs in `copilot` mode). Approve → it creates the Problem.

5. **Land it (30s).** "From summarizing one record to reasoning across records, systems, and time — and still ending at a human decision."

*Fallbacks:* (a) if the OOB multi-step is shaky on stage, switch to **Path B** (one agent, predictable); (b) keep a **pre-run execution / screen recording** in a tab; (c) worst case, walk the CMDB dependency view + `CHG0030045` manually. **Rehearse this stage most.**

---

## Stage 3 — Autonomous L1 Specialist (autonomy with oversight) · ~8 min

Hero agent: **`DocFlow L1 Access Request Specialist`** (custom, installed from the app). It reads the incident → runs its **`Assess Access Request Risk`** guardrail → auto-resolves safe requests or escalates risky ones.

**Scenario A — it acts (3 min).** Open INC0010003 — Théo Bernard needs **Create** rights in RT-Library.
1. "A brand-new ticket, no human has touched it. Watch the specialist take it end-to-end."
2. Run the agent. It reads the incident → the guardrail returns **auto_resolve** (standard, single-user, in-scope) → it grants access and resolves with a note. "Fully autonomous — because it's safe and routine."

**Scenario B — it refuses (3 min) — the point of the whole session.** Open INC0010004 — Inès Lefèvre requests **bulk Admin across all libraries for 6 external contractors**.
3. "Same agent, same channel. Watch what it does differently."
4. Run the agent. The guardrail fires on all four axes — call each out on screen: **privileged** (Admin), **bulk** (6 users), **external** accounts, **broad scope** (all libraries). It **escalates to a human approver** with the reasons in the work notes and does **not** provision.
5. **➤ THE LINE:** *"The most important thing this autonomous agent did was decide **not** to act alone."*

**OOB showcase (1 min).** "And this isn't bespoke — ServiceNow ships dozens of these." Briefly open the OOB **`Investigate and resolve ITSM incidents`** use case (or **`ITSM incident resolution investigation AI agent`**) to show the prebuilt resolution agents in the same Studio.

**Reporting (1–2 min).** Open the AI Agent analytics view: volume auto-handled vs escalated, deflection rate, escalation **reasons** (the guardrail categories), trend. "This is what makes autonomy acceptable to a CISO: every decision is measured, and the agent knows its limits."

---

## Closing (30 sec)

> "Assistant, to agents reasoning across our systems, to an autonomous specialist with judgment and guardrails — human in the lead at every gate. The obvious next question is: how do you *govern* a fleet of these, across vendors? That's the AI Control Tower — Topic 2."

---

## Timing & risk summary

| Stage | Time | Risk | Hard dependency |
|---|---|---|---|
| 1 — Now Assist skills | ~6 min | Low | Now Assist ITSM skills provisioned + active |
| 2 — Problem detection | ~8 min | **High** | OOB trend/problem agents activated **or** custom agent installed; pre-run recording ready |
| 3 — L1 Specialist | ~8 min | Medium | Custom agent installed + published; `autopilot` permitted; analytics pre-populated |

If running long, Stage 3 Scenario A and the OOB showcase can be trimmed — **never cut Scenario B** (the escalation) or the dashboard.
