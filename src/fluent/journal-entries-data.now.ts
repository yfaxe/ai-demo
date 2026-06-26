import { Record } from '@servicenow/sdk/core';

// Threaded work-note / comment history. sys_created_on backdates each entry and
// sys_created_by attributes it to a persona user_name (see personas-data.now.ts).
// NOTE: backdating + authorship only render correctly if the install preserves
// sys_created_on/sys_created_by — verify in the activity stream after deploy.

// ═══════════════════════════════════════════════════════════════════════════════
// INC0010001 — Stage 1: blocked document, wrong workflow → not PDF/A-compliant.
// 6 entries: signal (root cause + plan) mixed with noise (unrelated questions).
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010001-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value: 'Still blocked, this is now urgent — my reviewer is waiting and I cannot resubmit. Please help as soon as you can.',
    sys_created_on: '2026-06-24 07:48:00',
    sys_created_by: 'camille.roux',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value:
      'L1 acknowledging. Checked the DocFlow console — document QOR-2026-0417 is stuck in ERROR after the conversion step.\n- User connectivity: OK\n- Permissions on RT-Library: OK (not an access issue)\nThe document never completed PDF/A validation. Looks application-side, not user error on access.',
    sys_created_on: '2026-06-24 07:55:00',
    sys_created_by: 'sofia.marchetti',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value:
      'Noise: caller also asked about an unrelated RT-Library access question for a colleague who needs Create rights. Advised her to raise that separately — not related to this incident.',
    sys_created_on: '2026-06-24 08:05:00',
    sys_created_by: 'sofia.marchetti',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value: 'Thanks. By the way, the document title still shows the old template header — not sure if that matters. Also, is there any scheduled maintenance today? A colleague mentioned something.',
    sys_created_on: '2026-06-24 08:12:00',
    sys_created_by: 'camille.roux',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-5'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value:
      'Root cause identified. The wrong workflow template was launched at submission, so the PDF/A conversion step never validated. The document is therefore not PDF/A-compliant and ArchiveX rejected it, leaving it in ERROR.\nReference: KB-DOCFLOW-PDFA-CONVERT (Converting a PDF to PDF/A).',
    sys_created_on: '2026-06-24 08:25:00',
    sys_created_by: 'karim.haddad',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-6'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010001'),
    name: 'incident',
    value:
      'Plan: revert QOR-2026-0417 to "In Progress" so the user can relaunch the submission with the correct workflow template. Will advise her to use the standard RT-Library review template and share the PDF/A conversion KB.',
    sys_created_on: '2026-06-24 08:32:00',
    sys_created_by: 'karim.haddad',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2 cluster — light threads. The work notes show humans band-aiding each
// ticket individually (manual convert + relaunch) WITHOUT doing the cross-incident
// correlation or raising a Problem — that is the agent's job in the demo.
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010010-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010010'),
    name: 'incident',
    value:
      'Reproduced: RT-2026-0461 fails at the ArchiveX archiving step with "ArchiveX Archive Error". Converted the document to PDF/A manually and relaunched archiving — now Released. Applied as a workaround.',
    sys_created_on: '2026-06-23 10:25:00',
    sys_created_by: 'karim.haddad',
  },
});

Record({
  $id: Now.ID['inc0010011-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010011'),
    name: 'incident',
    value:
      'Same "ArchiveX Archive Error" on publish for SPC-2026-1187. Manual PDF/A conversion + relaunch cleared it; document published. That is a few of these this week — flagging for awareness.',
    sys_created_on: '2026-06-23 14:55:00',
    sys_created_by: 'sofia.marchetti',
  },
});

Record({
  $id: Now.ID['inc0010012-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010012'),
    name: 'incident',
    value: 'User reports "ArchiveX Archive Error" at the archiving step for TDR-2026-0884. The manual conversion workaround usually clears it; queue is busy, will action shortly.',
    sys_created_on: '2026-06-23 17:10:00',
    sys_created_by: 'sofia.marchetti',
  },
});

Record({
  $id: Now.ID['inc0010013-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', 'inc0010013'),
    name: 'incident',
    value:
      'Another "ArchiveX Archive Error" (MIN-2026-0312). These keep coming in over the last day or two. Each is worked around manually — we may need a Problem raised to address the underlying cause.',
    sys_created_on: '2026-06-24 08:05:00',
    sys_created_by: 'karim.haddad',
  },
});

Record({
  $id: Now.ID['inc0010014-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010014'),
    name: 'incident',
    value: 'My document will not publish — it fails with "ArchiveX Archive Error" at the end of the workflow. Colleagues on my floor are seeing the same thing this morning.',
    sys_created_on: '2026-06-24 08:38:00',
    sys_created_by: 'lucas.girard',
  },
});

Record({
  $id: Now.ID['inc0010015-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010015'),
    name: 'incident',
    value: 'Three of my documents failed to archive this morning, all with "ArchiveX Archive Error". This started a couple of days ago and is getting worse.',
    sys_created_on: '2026-06-24 08:50:00',
    sys_created_by: 'nathan.lopez',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3 — one inbound comment each; the AI Specialist acts on these live.
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010003-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010003'),
    name: 'incident',
    value:
      'Hello, I have recently joined the documentation review group and need to publish technical review documents to the RT-Library. I currently only have Read access and need Create rights. My user ID is TBERN02. Thank you.',
    sys_created_on: '2026-06-24 09:30:00',
    sys_created_by: 'theo.bernard',
  },
});

Record({
  $id: Now.ID['inc0010004-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', 'inc0010004'),
    name: 'incident',
    value:
      'Submitting on behalf of the new GlobalDoc contractor team. We need full Admin rights across all DocFlow libraries for our 6 external contractors, effective today as they start this morning. Please expedite.',
    sys_created_on: '2026-06-24 09:45:00',
    sys_created_by: 'ines.lefevre',
  },
});
