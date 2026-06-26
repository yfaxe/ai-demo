# CLAUDE.md — Data & AI Summer University 2026 Session

> Reusable project context for the Accenture / ServiceNow AI Agent governance session.
> Drop this file at the root of a Claude project (or paste into a new chat) to restore context.

---

## 1. Purpose & Context

**Owner:** Yves (Accenture)
**Event:** Data & AI Summer University 2026 — July 2, 2026, Le Domaine de Montjoie, Toulouse
**Session title:** "From AI assistants to autonomous IT" (alt. framing: "Govern & scale AI Agents with ServiceNow: from AI assistants to autonomous workforce")
**Audience:** Intermediate practitioners, already familiar with AI tools
**Domain:** ServiceNow AI Agent + governance capabilities
**Delivery context:** Accenture | **Reference customer:** Airbus

**Stakeholders:**
- Marion Genaivre — keynote speaker, theme "Human in the Lead" (session should echo this)
- Laurine Chaumond, Christophe Chatillon, Arthur Arkwright — event organizers
- Accenture AICT contacts: Vidhu Dutt, Thomas Niven, Maxine Setiawan

---

## 2. Session Structure

### Topic 1 — Live demo (three stages + droppable 4th)
1. **Now Assist skills baseline** — AI skills assisting humans (Stage 1 = standalone PDF/A "blocked document" incident)
2. **Proactive Problem-detection agent** — agent clusters recurring "ArchiveX Archive Error" incidents, correlates them to a shared CI + recent Change (CHG0030045), and proposes a Problem + comms + KB. Agentic reasoning across records/systems. **HIGHEST REHEARSAL RISK.** *(Chosen 2026-06-26 over the earlier "major incident CMDB/Change correlation" framing — more authentic to the real queue, lower CMDB-staging risk.)*
3. **Autonomous L1 AI Specialist with human oversight** — autonomous specialist, human-in-the-loop
4. **Autonomous development team** — pre-recorded, droppable if time-constrained

### Topic 2 — AI Control Tower (AICT)
- Delivered as a **slide set, not a live demo** (staging complexity)
- **AICT slide set = pending deliverable, not yet complete**

**Narrative arc (maintain consistently):** AI skills assisting humans → agentic reasoning across systems → autonomous specialist with human oversight. Deliberately mirrors ServiceNow's own maturity story. Reinforce the "Human in the Lead" theme throughout.

---

## 3. Demo Assets Produced

- **Full click-by-click demo script** for all three Topic 1 stages (pre-staging instructions, narrative beats, key lines, rehearsal risk flags)
- **Anonymized incident data sheets** from a real 7,598-incident ServiceNow export. Anonymization map: DocFlow, ArchiveX, RT-Library, TechDoc-Library, Site-North / Site-West
- **Stage 2 CMDB dependency diagram** (inline SVG): business application → CI dependencies → change record → downstream incidents, tracing agent reasoning
- **Fluent SDK seed app** (`x_acf_docflow_demo`, scope `5bceb7ff…`) under `src/fluent/` — generates all demo data on `now-sdk install`: personas (`sys_user`), CMDB CIs + dependencies, change `CHG0030045`, the Stage 1 incident, the Stage 2 incident cluster, the Stage 3 incidents, and threaded `sys_journal_field` work-note/comment history with backdated `sys_created_on` + persona `sys_created_by`. *(Superseded the earlier `add_demo_incident_history.js` Background Script approach — journal history is now declarative Fluent records, not script injection.)* See `DEMO_FLOW.md` for the stage-by-stage data→narrative map.
- **8-slide PowerPoint deck** (dark navy / electric teal): AI maturity journey, Agent Ecosystem, Agent Studio lifecycle, AICT governance pillars, Airbus use cases, responsible scaling principles
- **Structured markdown extraction** of the "AI Control Tower — ServiceNow v2" Accenture deck (May 2026)

---

## 4. Open Items / On the Horizon

- [ ] Complete the **Topic 2 AICT slide set** (primary pending deliverable)
- [x] ~~Resolve `APP-1B69` vs `APP-2T96`~~ — **standardized on `APP-1B69`** in all Fluent seed records (2026-06-26). `APP-2T96` is the *real* Airbus app code per the anonymization map and must never appear in the instance.
- [ ] **Build the live agents in the instance** (not in the repo — the Fluent app only seeds data): (a) Stage 2 proactive Problem-detection agent in Agent Studio, (b) Stage 3 ITSM L1 AI Specialist + guardrail policy that escalates privileged/bulk/external/broad-scope requests.
- [ ] **Post-deploy check:** verify journal `sys_created_on` backdating + persona `sys_created_by` actually render in the activity stream after `now-sdk install`.
- [ ] Confirm Airbus use case anchor for AICT demo — **MRO recommended** (strongest: high-stakes guardrail storytelling + Airbus authenticity); procurement = fallback
- [ ] Finalize multi-vendor agent staging — Gemini & Mistral **not live** in environment. Recommended: **pre-seed as governed inventory entries in AICT asset view** rather than live execution
- [ ] Rehearse Stage 2 Problem-detection segment (highest risk)

---

## 5. AICT Reference (for slide build)

**Four AICT objectives:** AI Strategy · AI Value · AI Governance · AI Execution

**AICT capabilities (pillars):** AI Strategy · AI Inventory (CMDB/CSDM) · AI Lifecycle · AI Risk & Compliance · AI Case Management · Value & Engagement · AI Control Tower Workspace

**Agentic AI governance — Four Controls Framework:**
1. **Agentic Registry** (Design & Scope) — purpose, autonomy level, tools, data access, human oversight, owner
2. **Guardrails** (Validate & Assure) — policy-linked gates, red-team tests, data masking
3. **Telemetry** (Deploy & Monitor) — end-to-end traces, drift/bias detection
4. **Attestation** (Deploy & Monitor) — signed model cards, provenance, regulator-ready proof

**Frameworks referenced:** EU AI Act, NIST AI RMF, ISO 42001

---

## 6. Domain Terminology

Now Assist · AI Agent Studio · AI Specialist · AI Control Tower (AICT) · CMDB · CI dependency · Change correlation · journal fields (work_notes / comments) · Background Script · GlideRecord · ITSM L1 · major incident · blast radius · connection-pool exhaustion · PDF/A conversion · guardrail/escalation pattern · shadow AI · RLHF · human-in-the-loop

---

## 7. Working Patterns (how Yves works with Claude)

- Produce **concrete, production-ready deliverables** (scripts, code, visuals, structured docs) — not conceptual outlines
- Assets are **self-consistent and rehearsal-ready**, with explicit risk flags called out
- Large source files (PPTX decks) are **extracted to structured markdown** before use as references
- **Visual QA** (PDF-to-image conversion) is part of the production workflow
- Slide count stays minimal — **the live demo carries the session weight**

**Key learnings:**
- Activity-stream history is now seeded declaratively as Fluent `sys_journal_field` records (backdated `sys_created_on`, persona `sys_created_by`) — this replaced the earlier `add_demo_incident_history.js` Background Script. Verify backdating survives the install.
- The real source queue (7,598 AODocs/AIRINA tickets) is overwhelmingly mundane P4 document/access issues (one P1 total) — so the live demo's dramatic moments are deliberately authored, not drawn from real major incidents. Stage 2 was reframed to **proactive Problem detection** to stay authentic to that queue.
- Multi-vendor live demo limits (Gemini/Mistral not configured) → pre-seed governance inventory instead of live execution

---

## 8. Tools & Resources

- **ServiceNow** demo environment (Now Assist, AI Agent Studio, AICT, CMDB, ITSM)
- **pptxgenjs** for programmatic PowerPoint generation
- **Background Scripts / GlideRecord** for ServiceNow data injection
- Accenture deck: "AI Control Tower — ServiceNow v2" (May 2026), extracted to markdown
