import { Record } from '@servicenow/sdk/core';

// ═══════════════════════════════════════════════════════════════════════════════
// INC0010001 — Intermittent Save Failures (P4, In Progress)
// Timeline: 07:48 – 08:45, building up to the final work_note on the record
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010001-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'Hi, just wanted to flag something - I was trying to save a PDF into RT-Library this morning and it just... didn\'t work? Got a timeout error after spinning for about 30 seconds. I tried again and it eventually went through but took forever. Not sure if it\'s just me or something bigger. Let me know if you need more details!',
    sys_created_on: '2025-06-10 07:48:00',
    sys_created_by: 'marie.dupont',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'L1 acknowledging. Caller mentioned the system felt sluggish even before the timeout. Running basic checks:\n- Verified user connectivity: OK\n- Browser cache cleared, retried: same behaviour\n- DocFlow portal loads but noticeably slower than usual\nWill check if others are reporting similar. Might be an app-side issue.',
    sys_created_on: '2025-06-10 07:55:00',
    sys_created_by: 'philippe.moreau',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'Checked DocFlow-Middleware-01 application logs. Findings:\n\n- Connection timeouts to DocFlow-DB-01 appearing since approximately 01:30 last night\n- Average response time degraded from 45ms baseline to 2800ms\n- Thread dump of connection pool shows 118 out of 120 connections in ACTIVE state\n- Remaining 2 connections flipping between ACTIVE and IDLE rapidly\n- No errors in middleware application code itself - purely a downstream DB connectivity issue\n\nThis correlates with the maintenance window for CHG0030045 which completed at 01:30.',
    sys_created_on: '2025-06-10 08:02:00',
    sys_created_by: 'admin',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'Hey, slightly off-topic but since you\'re looking at DocFlow anyway - has anyone else noticed that font preferences keep resetting? Every time I open a document the formatting toolbar goes back to defaults. Not urgent at all, just annoying. Cheers!',
    sys_created_on: '2025-06-10 08:15:00',
    sys_created_by: 'jean.bernard',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-5'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'Root cause identified.\n\nCHG0030045 executed last night (2025-06-09 23:00 - 2025-06-10 01:30) included two changes:\n1. PostgreSQL security patch on DocFlow-DB-01 (completed successfully)\n2. Connection pool max_size reduced from 200 to 120 as part of capacity review\n\nProduction load analysis shows peak concurrent connections during business hours: 135-145.\nWith max_pool=120, we are consistently exceeding capacity by 15-25 connections.\nResult: connection pool exhaustion causing queuing, timeouts, and intermittent failures.\n\nThis is the confirmed root cause. The pool reduction was too aggressive for production workload.',
    sys_created_on: '2025-06-10 08:30:00',
    sys_created_by: 'admin',
  },
});

Record({
  $id: Now.ID['inc0010001-journal-6'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010001']),
    name: 'incident',
    value: 'Cross-referencing with other open incidents:\n- INC0009990: Slow submissions reported at Site-North since ~08:05 (same root cause)\n- INC0009991: ArchiveX service failing with connection refused errors (same root cause)\n\nAll three incidents share the same underlying issue: connection pool exhaustion on DocFlow-DB-01 post-CHG0030045.\n\nDBA team (sarah.chen) has been notified and is reviewing. Recommending these be linked as related incidents. If the situation worsens, this may warrant a Major Incident declaration.',
    sys_created_on: '2025-06-10 08:45:00',
    sys_created_by: 'admin',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// INC0010002 — Total Service Outage / Major Incident (P1 Critical)
// Timeline: 08:15 – 08:50, rapid major incident response
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010002-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: '*** AUTOMATED MONITORING ALERT ***\n\nSource: DOCFLOW-PROD-HEALTH-001\nService: DocFlow Production (CI: APP-1B69)\nCondition: Health-check endpoint returning HTTP 503\nThreshold: 3 consecutive failures within 90 seconds\nStatus: BREACHED\n\nAll monitored endpoints failing:\n- /api/health: 503\n- /api/v2/documents: 503\n- /api/v2/archive: 504 (gateway timeout)\n\nAuto-creating P1 incident per monitoring rule MR-DocFlow-Critical.',
    sys_created_on: '2025-06-10 08:15:00',
    sys_created_by: 'automated',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'On-call acknowledged (lucas.martin). Checking dashboards now.\n\nConfirmed: TOTAL service failure. All DocFlow Production endpoints returning 503.\n\nGrafana dashboard DocFlow-Prod-Overview:\n- Connection pool utilization: 120/120 (100% - MAXED OUT) since 08:11\n- Request queue depth: 2,847 and climbing\n- Error rate: 100% for last 4 minutes\n- Active user sessions at time of failure: ~180\n\nThis is a complete outage, not degradation. No requests are being served.',
    sys_created_on: '2025-06-10 08:17:00',
    sys_created_by: 'lucas.martin',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Correlation analysis:\n- INC0010001 (opened 07:45): Intermittent save failures, identified connection pool exhaustion\n- INC0009990 (opened 08:05): Slow submissions at Site-North, same DB connectivity symptoms\n- INC0009991 (opened 08:12): ArchiveX service failing, connection refused to DocFlow-DB-01\n\nAll pointing to DocFlow-DB-01 connectivity / connection pool saturation.\n\nGiven total service failure affecting all users across multiple sites, I am proposing Major Incident status. Requesting bridge call to be initiated immediately.\n\nImpact assessment: ALL DocFlow services down. Estimated 200+ users affected across Site-North (Toulouse) and Site-West (Bristol).',
    sys_created_on: '2025-06-10 08:19:00',
    sys_created_by: 'lucas.martin',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'We cannot work at all. The entire documentation system is completely down - nothing loads, nothing saves. Our entire team in Toulouse (45 people) is blocked. We have project deliverables due today and cannot access any of our documents. Please advise urgently on when this will be restored. This is critical for us.',
    sys_created_on: '2025-06-10 08:22:00',
    sys_created_by: 'marie.dupont',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-5'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Confirming from Bristol site - DocFlow is completely down for us as well. The finance team (12 people) cannot process end-of-month documents which are due to the auditors by close of business today. This is business-critical and we need an ETA for restoration as soon as possible. Please escalate if not already done.',
    sys_created_on: '2025-06-10 08:25:00',
    sys_created_by: 'jean.bernard',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-6'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Major Incident bridge call initiated. Participants: lucas.martin, admin, sarah.chen (DBA), philippe.moreau (Service Desk).\n\nROOT CAUSE CONFIRMED:\nCHG0030045 (executed last night 23:00-01:30) reduced the database connection pool max_size from 200 to 120 on DocFlow-DB-01. This was part of a planned capacity review alongside a PostgreSQL security patch.\n\nProduction workload requires 135-145 concurrent connections at peak (business hours). With max_pool=120, the pool became fully exhausted by 08:11 as user activity ramped up, causing cascading failure across ALL DocFlow-dependent services:\n- DocFlow Middleware (primary application)\n- ArchiveX (document archival)\n- RT-Library (real-time library)\n- TechDoc-Library (technical documentation)\n\nFix path: Revert connection pool parameter to 200.',
    sys_created_on: '2025-06-10 08:28:00',
    sys_created_by: 'admin',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-7'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'DBA team joining the bridge (sarah.chen).\n\nCan confirm DocFlow-DB-01 is healthy - the PostgreSQL security patch from CHG0030045 applied cleanly and the database itself is performing normally. CPU 12%, memory 45%, disk I/O nominal. No query performance issues.\n\nThe issue is solely the connection-pool max-size parameter (max_connections in pgbouncer config). It was set to 120 as part of the change but production load exceeds this.\n\nPreparing emergency change to revert pool size from 120 back to 200. This requires a pgbouncer restart (brief interruption ~5 seconds) but no database restart.\n\nETA for fix: 15-20 minutes including change approval and verification.',
    sys_created_on: '2025-06-10 08:32:00',
    sys_created_by: 'sarah.chen',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-8'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Emergency change ECH0030046 raised to revert connection pool configuration.\n\nChange details:\n- Target: DocFlow-DB-01 pgbouncer configuration\n- Action: Set max_connections = 200 (revert from 120)\n- Backout plan: Already covered by CHG0030045 backout documentation\n- Risk: LOW (reverting to previously stable configuration)\n- Approval: Emergency CAB verbal approval obtained on bridge\n\nExpected resolution steps:\n1. Update pgbouncer.ini max_connections = 200\n2. Restart pgbouncer service on DocFlow-DB-01\n3. Restart DocFlow-Middleware-01 to clear stale connection states\n4. Monitor for 5 minutes to confirm stability\n\nSarah.chen executing now.',
    sys_created_on: '2025-06-10 08:35:00',
    sys_created_by: 'admin',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-9'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Customer communication sent to all affected users at Site-North (Toulouse) and Site-West (Bristol):\n\n"DocFlow is currently experiencing a service disruption affecting all document management functions. Our engineering team has identified the root cause and a fix is actively being implemented. Estimated time to restoration: 20 minutes from now (approximately 08:55 UTC). We apologize for the inconvenience and will send a follow-up notification once service is confirmed restored.\n\nIf you have urgent document processing needs, please contact the Service Desk directly at ext. 4400."\n\nSent via email distribution list and posted to Service Status page.',
    sys_created_on: '2025-06-10 08:38:00',
    sys_created_by: 'philippe.moreau',
  },
});

Record({
  $id: Now.ID['inc0010002-journal-10'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010002']),
    name: 'incident',
    value: 'Fix applied. Status update:\n\n1. pgbouncer.ini updated: max_connections = 200 [DONE]\n2. pgbouncer service restarted on DocFlow-DB-01 [DONE - 3 second interruption]\n3. DocFlow-Middleware-01 application restarted [DONE]\n4. Monitoring recovery:\n   - Connection pool utilization: 87/200 (43%) - HEALTHY\n   - Health-check endpoint: HTTP 200 [RECOVERED]\n   - Request queue depth: 0 (draining complete)\n   - Error rate: 0% for last 3 minutes\n   - Response time: 62ms (within normal range)\n\nAll dependent services (ArchiveX, RT-Library, TechDoc-Library) also reporting healthy.\n\nHolding for 5 additional minutes to confirm sustained stability before declaring resolved. Will update related incidents (INC0010001, INC0009990, INC0009991).',
    sys_created_on: '2025-06-10 08:50:00',
    sys_created_by: 'sarah.chen',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// INC0009990 — Slow Submissions at Site-North (P3)
// Timeline: 08:05 – 08:13, early warning signs before total outage
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0009990-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0009990']),
    name: 'incident',
    value: 'Bonjour, my document submissions are extremely slow this morning. I tried to upload a simple 2-page PDF to RT-Library and it took over a minute to save - normally this takes a few seconds. My colleague Pierre Lefebvre is experiencing the same thing from his workstation. We are both at the Toulouse office (Site-North, 3rd floor). This started around 7:50 when we arrived. Is there maintenance happening?',
    sys_created_on: '2025-06-10 08:05:00',
    sys_created_by: 'marie.dupont',
  },
});

Record({
  $id: Now.ID['inc0009990-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0009990']),
    name: 'incident',
    value: 'Received call from Site-North. Multiple users affected (at least 2 confirmed, likely more as the floor fills up).\n\nBasic connectivity checks:\n- Ping to DocFlow Production: responds OK but slow\n- HTTP GET /api/health: 200 OK but response time ~4500ms (normal baseline <200ms)\n- traceroute: no unusual hops or packet loss\n- Site-North local network: no issues reported by network team\n\nThis is a 22x degradation in response time. Not a network issue - appears to be application-side latency.',
    sys_created_on: '2025-06-10 08:08:00',
    sys_created_by: 'philippe.moreau',
  },
});

Record({
  $id: Now.ID['inc0009990-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0009990']),
    name: 'incident',
    value: 'Contacted network operations (NOC). They confirm:\n- No WAN issues between Site-North (Toulouse) and primary data center\n- BGP routes stable, no flapping\n- Bandwidth utilization normal (23% of capacity)\n- Latency between sites: 8ms (normal)\n\nThis rules out network as a factor. The latency is definitively application-side. Escalating to L2 application support team for deeper investigation.',
    sys_created_on: '2025-06-10 08:11:00',
    sys_created_by: 'philippe.moreau',
  },
});

Record({
  $id: Now.ID['inc0009990-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0009990']),
    name: 'incident',
    value: 'Update - it is getting worse now. Some submissions are failing completely with an error message saying "Service temporarily unavailable - please retry in a few minutes." Three of us have seen this error in the last 5 minutes. We cannot do our work like this. More people are arriving and everyone is having the same problem.',
    sys_created_on: '2025-06-10 08:13:00',
    sys_created_by: 'marie.dupont',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// INC0009991 — ArchiveX Service Timeout Errors (P3)
// Timeline: 08:12 – 08:18, archive service failing due to shared pool
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0009991-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0009991']),
    name: 'incident',
    value: '*** AUTOMATED ALERT ***\n\nSource: ArchiveX Monitoring (ARCHX-HEALTH-002)\nEndpoint: /api/v2/archive\nStatus: HTTP 504 Gateway Timeout\nFailure count: 23 consecutive failures in last 2 minutes\nQueue depth: 512 documents pending (threshold: 500)\nStatus: CRITICAL\n\nArchiveX service is unable to process document archival requests. All archive operations are failing. Queue is growing and will continue to accumulate until service is restored.',
    sys_created_on: '2025-06-10 08:12:00',
    sys_created_by: 'automated',
  },
});

Record({
  $id: Now.ID['inc0009991-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0009991']),
    name: 'incident',
    value: 'Checking ArchiveX service pod logs (kubectl logs archivex-prod-7f8d9b6c4-xk2mn):\n\nRepeating error pattern:\n[ERROR] 08:10:47 - ConnectionPool: Connection refused to DocFlow-DB-01:5432\n[ERROR] 08:10:47 - ArchiveService: Failed to acquire database connection (timeout after 30000ms)\n[ERROR] 08:10:48 - QueueProcessor: Unable to persist document metadata, requeueing batch\n\nArchiveX cannot reach the database - all its allocated connections are timing out. The ArchiveX service has its own connection allocation from the shared pgbouncer pool on DocFlow-DB-01.\n\nThis looks directly related to the connection pool issue identified in INC0010001. The middleware is consuming most of the 120 available connections, leaving nothing for ArchiveX.',
    sys_created_on: '2025-06-10 08:14:00',
    sys_created_by: 'lucas.martin',
  },
});

Record({
  $id: Now.ID['inc0009991-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0009991']),
    name: 'incident',
    value: 'The archive function is completely broken. We have regulatory compliance documents that MUST be archived by end of day per our retention policy. If this is not fixed in the next few hours we will have compliance issues with the auditors. The finance team relies on automatic archival for month-end processing. Please treat this as high priority.',
    sys_created_on: '2025-06-10 08:16:00',
    sys_created_by: 'jean.bernard',
  },
});

Record({
  $id: Now.ID['inc0009991-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0009991']),
    name: 'incident',
    value: 'Confirmed: ArchiveX shares the same pgbouncer connection pool on DocFlow-DB-01 as the main DocFlow middleware. Architecture:\n\n- pgbouncer max_connections: 120 (reduced from 200 by CHG0030045)\n- DocFlow Middleware allocation: up to 100 connections\n- ArchiveX allocation: up to 30 connections\n- RT-Library allocation: up to 20 connections\n- (Oversubscribed by design, works when total demand <200)\n\nWith the pool capped at 120 and the middleware consuming 118+ connections during peak, ArchiveX is completely starved - zero connections available.\n\nLinking to INC0010001 as same root cause: connection pool exhaustion post-CHG0030045. Resolution depends on reverting the pool size.',
    sys_created_on: '2025-06-10 08:18:00',
    sys_created_by: 'lucas.martin',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// INC0010003 — Simple RT-Library Access Request (P4, New)
// Timeline: 09:30 – 09:40, straightforward access provisioning
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010003-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010003']),
    name: 'incident',
    value: 'Hello, I have recently been assigned to Project Horizon and need to upload technical review documents to the RT-Library. My manager Jean-Luc Bernard has approved this request (he can confirm if needed). I currently only have Read access to RT-Library and need Create permission so I can upload documents.\n\nMy details:\n- Employee ID: EMP-4521\n- Department: Engineering\n- Location: Site-North (Toulouse)\n- Manager: Jean-Luc Bernard\n\nThank you for your help!',
    sys_created_on: '2025-06-10 09:30:00',
    sys_created_by: 'marie.dupont',
  },
});

Record({
  $id: Now.ID['inc0010003-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010003']),
    name: 'incident',
    value: 'Standard access request - performing verification checks:\n\n1. User identity: m.dupont (Marie Dupont) - VERIFIED active employee\n2. Department: Engineering - CONFIRMED\n3. Employee ID: EMP-4521 - MATCHES HR record\n4. Manager: j.bernard (Jean-Luc Bernard) - CONFIRMED as direct manager\n5. Manager approval: Email confirmation received 2025-06-09 from j.bernard@company.com\n6. Requested permission: RT-Library Create access\n7. Policy check: RT-Library Create is a standard entitlement for Engineering department staff (per ACCESS-POL-012)\n\nAll checks pass. This is a standard provisioning request - no security review required. Can be processed directly under delegated authority.',
    sys_created_on: '2025-06-10 09:35:00',
    sys_created_by: 'philippe.moreau',
  },
});

Record({
  $id: Now.ID['inc0010003-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010003']),
    name: 'incident',
    value: 'Hi Marie, your request has been received and validated. Your manager\'s approval is confirmed. Create access to RT-Library will be provisioned shortly - you should have full upload capability within the hour. You will receive an email confirmation once the permission is active. Please let us know if you have any issues after that. Welcome to Project Horizon!',
    sys_created_on: '2025-06-10 09:40:00',
    sys_created_by: 'philippe.moreau',
  },
});

// ═══════════════════════════════════════════════════════════════════════════════
// INC0010004 — Risky Bulk Admin Request (P3, New)
// Timeline: 09:45 – 10:00, security guardrails triggered
// ═══════════════════════════════════════════════════════════════════════════════

Record({
  $id: Now.ID['inc0010004-journal-1'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010004']),
    name: 'incident',
    value: 'Request submitted via email by ext.garcia@globaldoc.io on behalf of the GlobalDoc Solutions project team.\n\nWe need Admin-level access provisioned for our project team members to all DocFlow libraries. The following 6 users require full administrative permissions including document management, bulk export, and permission management capabilities:\n\n1. ext.garcia@globaldoc.io\n2. ext.mueller@globaldoc.io\n3. ext.tanaka@globaldoc.io\n4. ext.silva@globaldoc.io\n5. ext.okafor@globaldoc.io\n6. ext.petrov@globaldoc.io\n\nWe are starting the integration phase of our project next week and need these permissions in place by Friday. Thank you.',
    sys_created_on: '2025-06-10 09:45:00',
    sys_created_by: 'automated',
  },
});

Record({
  $id: Now.ID['inc0010004-journal-2'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010004']),
    name: 'incident',
    value: '*** SECURITY ALERT - AUTOMATED RISK ASSESSMENT ***\n\nRequest analyzed against security policy framework. Multiple risk indicators detected:\n\n- Permission level requested: ADMIN (highest privilege tier)\n- User type: EXTERNAL (non-employee contractor accounts, @globaldoc.io domain)\n- Scope: ALL LIBRARIES (no specific library named - broadest possible access)\n- Quantity: 6 users (bulk provisioning request)\n- Capabilities included: Document Management, Bulk Export, Manage Permissions, Delete, Sub-library Admin\n\nIndividual risk factors:\n[HIGH] External users requesting Admin = Policy violation (SEC-DOC-003 Section 4.2)\n[HIGH] Bulk Export on all libraries = Data exfiltration risk\n[CRITICAL] Manage Permissions = Would allow external users to grant access to other parties\n[MEDIUM] No time-bound constraint specified = Permanent access implied\n[MEDIUM] Bulk request = Reduced individual accountability\n\nAggregate risk score: CRITICAL\nAction: Auto-escalating to security team per SEC-DOC-003 Section 7.1',
    sys_created_on: '2025-06-10 09:47:00',
    sys_created_by: 'automated',
  },
});

Record({
  $id: Now.ID['inc0010004-journal-3'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010004']),
    name: 'incident',
    value: 'Security review initiated (emma.wilson, Information Security team).\n\nDetailed analysis of concerns:\n\n1. POLICY VIOLATION: External contractors are explicitly prohibited from holding Admin rights per SEC-DOC-003 Section 4.2. Maximum permissible level for external accounts is Contributor (Create, Read, Update on named libraries only).\n\n2. DATA EXFILTRATION RISK: Bulk Export capability across all libraries would allow downloading the entire document corpus. Combined with external account status, this represents significant data loss risk. Our DLP controls cannot effectively monitor bulk exports by external accounts.\n\n3. PRIVILEGE ESCALATION RISK: Manage Permissions capability would allow these external accounts to grant access to additional external parties without internal oversight. This bypasses all access governance controls.\n\n4. SCOPE CONCERNS: "All libraries" includes restricted libraries (Legal-Confidential, HR-Private, Finance-Audit) that require explicit per-library authorization even for internal staff.\n\n5. NO TEMPORAL CONSTRAINT: Request implies permanent access. External accounts must have time-bound access with mandatory review cycles per SEC-GEN-001.\n\nRecommendation: DENY as submitted. Will prepare alternative proposal.',
    sys_created_on: '2025-06-10 09:52:00',
    sys_created_by: 'emma.wilson',
  },
});

Record({
  $id: Now.ID['inc0010004-journal-4'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'comments',
    element_id: Now.ref('incident', Now.ID['inc0010004']),
    name: 'incident',
    value: 'Thank you for your access request. This has been flagged for security review as it involves elevated permissions for external contractor accounts.\n\nA member of our Information Security team is reviewing your request and will provide an alternative access proposal within 4 business hours.\n\nFor your reference, our external contractor access policy (SEC-DOC-003) limits permissions to Contributor level on specifically named libraries. Admin-level access for external accounts requires CISO exception approval with additional controls.\n\nIf you have questions about our access policies or need to discuss your project requirements, please contact the Security team at security-review@company.com or your internal project sponsor.',
    sys_created_on: '2025-06-10 09:55:00',
    sys_created_by: 'emma.wilson',
  },
});

Record({
  $id: Now.ID['inc0010004-journal-5'],
  $meta: { installMethod: 'demo' },
  table: 'sys_journal_field',
  data: {
    element: 'work_notes',
    element_id: Now.ref('incident', Now.ID['inc0010004']),
    name: 'incident',
    value: 'SECURITY TEAM RECOMMENDATION\n\nDecision: DENY as submitted.\n\nAlternative proposal for requestor:\n\n1. Permission level: Contributor (Create, Read, Update only - NO Delete, NO Admin)\n2. Scope: RT-Library and TechDoc-Library ONLY (2 specific libraries relevant to GlobalDoc project)\n3. NO Bulk Export capability (individual document download only)\n4. NO Manage Permissions capability\n5. NO access to restricted libraries (Legal-Confidential, HR-Private, Finance-Audit)\n6. NO sub-library administrative access\n7. Time constraint: 90-day access window with mandatory quarterly review\n8. Monitoring: Enhanced audit logging enabled for all external account activity\n\nApproval requirements for alternative:\n- Internal project manager sign-off required\n- Standard access request form for each individual user\n\nIf Admin access is genuinely required (unlikely for integration work):\n- Requires formal CISO exception request\n- Must include business justification, risk acceptance, and compensating controls\n- Minimum 5 business day review process\n- Time-limited to 30 days maximum with weekly review\n\nRouting back to service desk for customer communication.',
    sys_created_on: '2025-06-10 10:00:00',
    sys_created_by: 'emma.wilson',
  },
});
