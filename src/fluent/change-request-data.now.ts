import { Record } from '@servicenow/sdk/core';

// The Stage 2 "smoking gun": a change that closed successfully two nights before
// the incident cluster, on the ArchiveX Service CI. The PDF/A conversion engine
// update is the unintended root cause of the recurring "ArchiveX Archive Error".

Record({
    $id: Now.ID['chg0030045'],
    $meta: { installMethod: 'demo' },
    table: 'change_request',
    data: {
        number: 'CHG0030045',
        short_description: 'Upgrade ArchiveX archival service to v4.2 (PDF/A conversion engine update)',
        type: 'normal',
        state: 3,
        close_code: 'successful',
        cmdb_ci: Now.ref('cmdb_ci', 'archivex-service-ci'),
        start_date: '2026-06-22 23:00:00',
        end_date: '2026-06-23 01:30:00',
        work_start: '2026-06-22 23:05:00',
        work_end: '2026-06-23 01:22:00',
        opened_at: '2026-06-18 14:30:00',
        closed_at: '2026-06-23 01:35:00',
        description:
            'Upgrade the ArchiveX archival microservice from v4.1 to v4.2.\n\nThis release updates the embedded PDF/A conversion/validation engine (Apache PDFBox 2.x → 3.x) used when published documents are archived. The new engine applies stricter PDF/A-2b compliance checks.\n\nMaintenance window: 22:00-01:30 UTC.\nExpected impact: brief archiving pause during service restart (~5 minutes).\nRollback: redeploy the v4.1 container image (snapshot retained).',
        close_notes:
            'ArchiveX upgraded to v4.2 successfully. Service restarted at 01:10 and health checks are green. Test archival of a sample PDF/A document completed without error. No issues observed during the maintenance window.',
        risk: 3,
        impact: 2,
        urgency: 2,
        priority: 3,
        category: 'Software',
        production_system: true,
        active: false,
    },
});
