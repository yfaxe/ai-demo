import { Record } from '@servicenow/sdk/core';

// ─── CMDB Configuration Items ───────────────────────────────────────────────

Record({
    $id: Now.ID['docflow-production-ci'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci',
    data: {
        name: 'DocFlow Production (APP-1B69)',
        sys_class_name: 'cmdb_ci_business_app',
        operational_status: 1,
        environment: 'Production',
    },
});

Record({
    $id: Now.ID['docflow-db-01'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci',
    data: {
        name: 'DocFlow-DB-01',
        sys_class_name: 'cmdb_ci_database',
        operational_status: 1,
        short_description: 'PostgreSQL 14 – primary database for DocFlow',
    },
});

Record({
    $id: Now.ID['docflow-middleware-01'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci',
    data: {
        name: 'DocFlow-Middleware-01',
        sys_class_name: 'cmdb_ci_app_server',
        operational_status: 1,
        short_description: 'Java 17 middleware layer – connection pooling and REST gateway',
    },
});

Record({
    $id: Now.ID['archivex-service-ci'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_ci',
    data: {
        name: 'ArchiveX Service',
        sys_class_name: 'cmdb_ci_service',
        operational_status: 1,
        short_description: 'Microservice handling long-term document archival and retrieval',
    },
});

// ─── CMDB Relationships (Depends on::Used by) ──────────────────────────────

Record({
    $id: Now.ID['docflow-depends-on-db'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_rel_ci',
    data: {
        parent: Now.ref('cmdb_ci', Now.ID['docflow-production-ci']),
        child: Now.ref('cmdb_ci', Now.ID['docflow-db-01']),
        type: Now.ref('cmdb_rel_type', '1a9cb166f1571100a92eb60da2bce5c5'),
    },
});

Record({
    $id: Now.ID['docflow-depends-on-middleware'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_rel_ci',
    data: {
        parent: Now.ref('cmdb_ci', Now.ID['docflow-production-ci']),
        child: Now.ref('cmdb_ci', Now.ID['docflow-middleware-01']),
        type: Now.ref('cmdb_rel_type', '1a9cb166f1571100a92eb60da2bce5c5'),
    },
});

Record({
    $id: Now.ID['docflow-depends-on-archivex'],
    $meta: { installMethod: 'demo' },
    table: 'cmdb_rel_ci',
    data: {
        parent: Now.ref('cmdb_ci', Now.ID['docflow-production-ci']),
        child: Now.ref('cmdb_ci', Now.ID['archivex-service-ci']),
        type: Now.ref('cmdb_rel_type', '1a9cb166f1571100a92eb60da2bce5c5'),
    },
});
