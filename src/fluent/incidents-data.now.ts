import { Record } from '@servicenow/sdk/core';

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 1 — Now Assist skills baseline
// INC0010001: standalone "document blocked in Error" issue (wrong workflow → not
// PDF/A-compliant). Self-contained so Summarize / Suggest response / Close notes
// have a single clean story with realistic signal-vs-noise in the activity stream.
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010001'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010001',
    short_description: 'DocFlow — document blocked in "Error" status, cannot resubmit after PDF conversion',
    description:
      '===USER INFORMATION===\nContact: Camille Roux\nLocation (Site/Building/Floor): Site-North (Toulouse) / Building B23 / Floor 1\nInternal or External user: Internal\nConnection: LAN\nDevice: Standard laptop\n===ISSUE===\nI tried to push my document several times and each time it comes back with an error. Reference: QOR-2026-0417 ("Quarterly Operations Review - QOR-2026-0417 - v1.0.pdf"). Could you please remove the blocked version so I can retry with a new request? It is blocking my approval deadline this week.',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 3,
    urgency: 3,
    priority: 4,
    incident_state: 2,
    state: 2,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-camille-roux'),
    opened_at: '2026-06-24 07:45:00',
    contact_type: 'self-service',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2 — Proactive Problem detection
// A cluster of recurring "ArchiveX Archive Error" incidents, all on DocFlow
// Production, all appearing since CHG0030045 (ArchiveX v4.2 upgrade). Individually
// low priority and manually worked around; no single L1 sees the pattern. The agent
// clusters them, correlates to the changed CI, and proposes a Problem + comms + KB.
// Window: 2026-06-23 morning → 2026-06-24 morning (~24h after the change).
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010010'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010010',
    short_description: 'ArchiveX Archive Error when publishing document — workflow blocked',
    description:
      'Trying to publish document RT-2026-0461 to RT-Library. The workflow stops at the archiving step with the message "ArchiveX Archive Error". The document was publishing fine last week. Could you help me get it released?',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 2,
    urgency: 2,
    priority: 3,
    incident_state: 6,
    state: 6,
    active: false,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-lea-garnier'),
    opened_at: '2026-06-23 09:15:00',
    resolved_at: '2026-06-23 10:40:00',
    resolved_by: Now.ref('sys_user', 'persona-karim-haddad'),
    close_code: 'Solved (Work Around)',
    close_notes:
      'The document RT-2026-0461 was converted to PDF/A manually and the archiving was relaunched. The document is now Released. Workaround applied; root cause not yet addressed.',
    contact_type: 'self-service',
  },
});

Record({
  $id: Now.ID['inc0010011'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010011',
    short_description: 'Cannot publish document — ArchiveX Archive Error at archiving step',
    description:
      'Hello, my document SPC-2026-1187 will not publish. At the end of the workflow it fails with "ArchiveX Archive Error". I have tried twice with the same result. Please advise.',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 3,
    urgency: 3,
    priority: 4,
    incident_state: 6,
    state: 6,
    active: false,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-mathis-fontaine'),
    opened_at: '2026-06-23 14:20:00',
    resolved_at: '2026-06-23 15:05:00',
    resolved_by: Now.ref('sys_user', 'persona-sofia-marchetti'),
    close_code: 'Solved (Work Around)',
    close_notes:
      'Same "ArchiveX Archive Error" on publish. Document converted manually and archiving relaunched — now published. Logged for awareness; seeing several of these this week.',
    contact_type: 'virtual_agent',
  },
});

Record({
  $id: Now.ID['inc0010012'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010012',
    short_description: 'Document stuck — ArchiveX returns Archive Error after PDF conversion',
    description:
      'My document TDR-2026-0884 is stuck. The workflow reaches the archiving step and then shows "ArchiveX Archive Error". It will not complete. I need this published for a review.',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 2,
    urgency: 2,
    priority: 3,
    incident_state: 2,
    state: 2,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-hugo-mercier'),
    opened_at: '2026-06-23 16:50:00',
    contact_type: 'self-service',
  },
});

Record({
  $id: Now.ID['inc0010013'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010013',
    short_description: 'ArchiveX Archive Error — unable to archive published document',
    description:
      'I am unable to archive document MIN-2026-0312. The archiving step fails with "ArchiveX Archive Error" every time. This worked previously. Please help.',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 3,
    urgency: 3,
    priority: 4,
    incident_state: 2,
    state: 2,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-chloe-dubois'),
    opened_at: '2026-06-24 07:55:00',
    contact_type: 'virtual_agent',
  },
});

Record({
  $id: Now.ID['inc0010014'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010014',
    short_description: 'Publication failing with ArchiveX Archive Error',
    description:
      'My document will not publish — it fails with "ArchiveX Archive Error" at the end of the workflow. Colleagues on my floor are seeing the same thing this morning.',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 2,
    urgency: 2,
    priority: 3,
    incident_state: 1,
    state: 1,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-lucas-girard'),
    opened_at: '2026-06-24 08:35:00',
    contact_type: 'self-service',
  },
});

Record({
  $id: Now.ID['inc0010015'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010015',
    short_description: 'ArchiveX Archive Error affecting multiple document submissions',
    description:
      'Three of my documents failed to archive this morning, all with "ArchiveX Archive Error". This started a couple of days ago and seems to be getting worse. Can someone look into it?',
    category: 'failure',
    subcategory: 'software_issue',
    impact: 2,
    urgency: 2,
    priority: 3,
    incident_state: 1,
    state: 1,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-nathan-lopez'),
    opened_at: '2026-06-24 08:50:00',
    contact_type: 'virtual_agent',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3 — Autonomous L1 AI Specialist
// Two fresh inbound tickets. INC0010003 is within autonomous scope (auto-resolves);
// INC0010004 trips guardrails (privileged + bulk + external + broad scope) and the
// specialist hands off to a human. Kept minimal so the agent does the work live.
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010003'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010003',
    short_description: 'Need "Create" rights in RT-Library to publish a document',
    description:
      'I need to publish a document in the RT-Library but I do not have "Create" access. Please grant Create rights so I can publish. User ID: TBERN02.',
    category: 'access',
    subcategory: 'rights',
    impact: 3,
    urgency: 3,
    priority: 4,
    incident_state: 1,
    state: 1,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-theo-bernard'),
    opened_at: '2026-06-24 09:30:00',
    contact_type: 'virtual_agent',
  },
});

Record({
  $id: Now.ID['inc0010004'],
  $meta: { installMethod: 'demo' },
  table: 'incident',
  data: {
    number: 'INC0010004',
    short_description: 'Request bulk "Admin" rights across all DocFlow libraries for new contractor team',
    description:
      'Please grant full Admin rights across ALL DocFlow libraries to our 6 new external contractors (external accounts), effective today. They start this morning.\n\nContractors:\n- ext.garcia@globaldoc.example\n- ext.mueller@globaldoc.example\n- ext.tanaka@globaldoc.example\n- ext.silva@globaldoc.example\n- ext.okafor@globaldoc.example\n- ext.petrov@globaldoc.example\n\nThese are external contractor accounts (non-employees). Required for a document migration project.',
    category: 'access',
    subcategory: 'rights',
    impact: 2,
    urgency: 2,
    priority: 3,
    incident_state: 1,
    state: 1,
    active: true,
    cmdb_ci: Now.ref('cmdb_ci', 'docflow-production-ci'),
    caller_id: Now.ref('sys_user', 'persona-ines-lefevre'),
    opened_at: '2026-06-24 09:45:00',
    contact_type: 'virtual_agent',
  },
});
