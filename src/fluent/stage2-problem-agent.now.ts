import { AiAgent } from '@servicenow/sdk/core';

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 2 — Proactive Problem-detection agent
// Single agent (all tools are CRUD = same capability type). It auto-investigates
// (lookups run in `autopilot`), then STOPS for human approval before creating the
// Problem (`Create Problem` runs in `copilot`). That gate IS the "Human in the Lead"
// beat. Run it from the Now Assist Panel during the demo (no record trigger, for
// predictability).
//
// Portable: uses only CRUD tools + stable OOB role sys_ids (itil/admin). No
// instance-specific sys_ids. Requires AI Agent Studio (sn_aia_*) on the target.
// ═══════════════════════════════════════════════════════════════════════════════

const ROLE_ITIL = '282bf1fac6112285017366cb5f867469';
const ROLE_ADMIN = '2831a114c611228501d4ea6c309d626d';

export const docflowProblemDetectionAgent = AiAgent({
  $id: Now.ID['stage2-problem-detection-agent'],
  name: 'DocFlow Proactive Problem Detection',
  description:
    'Detects clusters of recurring incidents on the DocFlow platform, correlates them to a shared configuration item and a recent change, and proposes a Problem record with root-cause analysis for human approval.',
  agentRole: 'You are a senior ServiceNow Problem Manager for the DocFlow document platform.',
  recordType: 'custom',
  channel: 'nap_and_va',
  processingMessage: 'Scanning the DocFlow queue for recurring issues…',
  postProcessingMessage: 'Problem analysis complete.',

  // Who can invoke the agent (governance: role-scoped, not open).
  securityAcl: {
    $id: Now.ID['stage2-problem-detection-agent-acl'],
    type: 'Specific role',
    roles: [ROLE_ITIL, ROLE_ADMIN],
  },
  // Runs as the invoking user, restricted to these roles (required when runAsUser is unset).
  dataAccess: {
    roleList: [ROLE_ITIL, ROLE_ADMIN],
  },

  versionDetails: [
    {
      name: 'V1',
      number: 1,
      state: 'published',
      instructions: `You proactively find systemic problems hiding inside many low-priority incidents.

Step 1: Use "Find Recurring DocFlow Incidents" to retrieve recent incidents matching the recurring symptom (default the search to "Archive Error" unless the user specifies another). Note how many there are, the common Configuration Item, the affected sites, and the time window.
Step 2: If 3 or more incidents share the same Configuration Item and symptom, treat it as a cluster. If not, report that no systemic pattern was found and STOP.
Step 3: Use "Get CI Dependencies" on the shared business application CI to list the services/CIs it depends on.
Step 4: Use "Find Recent Changes on CI" against the dependent service CI (e.g. ArchiveX Service). Treat a change that closed shortly BEFORE the incidents began as the probable root cause, even if it was marked successful.
Step 5: Summarize for the user: probable root cause, the suspect change number, blast radius (affected CI, incident count, sites), and a recommended fix. Then draft (a) a proposed Problem statement and (b) a short proactive customer communication.
Step 6: Present the proposal and ASK the user to approve creating the Problem. DO NOT create the Problem until the user explicitly approves.
Step 7: On approval, use "Create Problem". In the Problem description, list the correlated incident numbers and name the suspect change. Then confirm the Problem number to the user.

Always propose first and act only on approval. Never modify or close the source incidents.`,
    },
  ],

  tools: [
    {
      active: true,
      name: 'Find Recurring DocFlow Incidents',
      description: 'Searches recent incidents by symptom text to detect a recurring pattern.',
      type: 'crud',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Searching the incident queue for recurring symptoms…',
      postMessage: 'Matching incidents retrieved.',
      inputs: {
        operationName: 'lookup',
        table: 'incident',
        inputFields: [
          { name: 'symptom', description: 'Recurring error text to search for, e.g. "Archive Error".', mandatory: false },
        ],
        queryCondition: 'short_descriptionLIKE{{symptom}}^ORDERBYDESCopened_at',
        returnFields: [
          { name: 'number' },
          { name: 'short_description' },
          { name: 'state' },
          { name: 'priority' },
          { name: 'opened_at' },
          { name: 'cmdb_ci', referenceConfig: { table: 'cmdb_ci', field: 'name' } },
        ],
      },
    },
    {
      active: true,
      name: 'Get CI Dependencies',
      description: 'Lists the configuration items a business application depends on.',
      type: 'crud',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Walking the CMDB dependency graph…',
      postMessage: 'Dependencies retrieved.',
      inputs: {
        operationName: 'lookup',
        table: 'cmdb_rel_ci',
        inputFields: [
          { name: 'ci_name', description: 'Name (or partial name) of the parent business application, e.g. "DocFlow Production".', mandatory: true },
        ],
        queryCondition: 'parent.nameLIKE{{ci_name}}',
        returnFields: [
          { name: 'child', referenceConfig: { table: 'cmdb_ci', field: 'name' } },
          { name: 'type', referenceConfig: { table: 'cmdb_rel_type', field: 'name' } },
          { name: 'parent', referenceConfig: { table: 'cmdb_ci', field: 'name' } },
        ],
      },
    },
    {
      active: true,
      name: 'Find Recent Changes on CI',
      description: 'Finds change requests affecting a given configuration item.',
      type: 'crud',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Checking recent changes on the configuration item…',
      postMessage: 'Change history retrieved.',
      inputs: {
        operationName: 'lookup',
        table: 'change_request',
        inputFields: [
          { name: 'ci_name', description: 'Name (or partial name) of the configuration item, e.g. "ArchiveX Service".', mandatory: true },
        ],
        queryCondition: 'cmdb_ci.nameLIKE{{ci_name}}^ORDERBYDESCend_date',
        returnFields: [
          { name: 'number' },
          { name: 'short_description' },
          { name: 'close_code' },
          { name: 'close_notes' },
          { name: 'end_date' },
          { name: 'cmdb_ci', referenceConfig: { table: 'cmdb_ci', field: 'name' } },
        ],
      },
    },
    {
      active: true,
      name: 'Create Problem',
      description: 'Creates a Problem record once the user approves.',
      type: 'crud',
      recordType: 'custom',
      executionMode: 'copilot',
      preMessage: 'Creating the Problem record for your approval…',
      postMessage: 'Problem created.',
      inputs: {
        operationName: 'create',
        table: 'problem',
        inputFields: [
          { name: 'short_description', description: 'Concise problem statement.', mandatory: true, mappedToColumn: 'short_description' },
          { name: 'description', description: 'Root-cause analysis: correlated incident numbers, shared CI, suspect change, recommended fix.', mandatory: true, mappedToColumn: 'description' },
        ],
      },
    },
  ],

  triggerConfig: [],
});
