import { AiAgent } from '@servicenow/sdk/core';

// ═══════════════════════════════════════════════════════════════════════════════
// STAGE 3 — Autonomous L1 Service Desk Specialist (with access guardrail)
// Get incident → Assess Access Request Risk (the guardrail) → branch:
//   • auto_resolve → fulfil + resolve   (Scenario A, INC0010003)
//   • escalate     → route to a human   (Scenario B, INC0010004)
// All tools run autopilot: the agent acts autonomously, and the governance moment
// is that it CHOOSES to escalate risky requests rather than act. Scripts live in
// external .js files (Now.include) to avoid the Fluent literal-only parser.
//
// Note: autopilot auto-execution may be gated by Now Assist autonomy settings on
// the target instance. Requires AI Agent Studio (sn_aia_*).
// ═══════════════════════════════════════════════════════════════════════════════

const ROLE_ITIL = '282bf1fac6112285017366cb5f867469';
const ROLE_ADMIN = '2831a114c611228501d4ea6c309d626d';

export const docflowL1SpecialistAgent = AiAgent({
  $id: Now.ID['stage3-l1-specialist-agent'],
  name: 'DocFlow L1 Access Request Specialist',
  description:
    'Autonomously triages DocFlow access-request incidents: fulfils standard, in-scope requests and escalates any request that trips the access guardrail (privileged, bulk, external, or broad-scope) to a human approver.',
  agentRole:
    'You are an autonomous L1 service desk specialist for the DocFlow document platform, operating under a strict access-governance policy. You keep the human in the lead by acting only on safe, in-scope requests and escalating anything risky.',
  recordType: 'custom',
  channel: 'nap_and_va',
  processingMessage: 'Reviewing the access request…',
  postProcessingMessage: 'Access request handled.',

  securityAcl: {
    $id: Now.ID['stage3-l1-specialist-agent-acl'],
    type: 'Specific role',
    roles: [ROLE_ITIL, ROLE_ADMIN],
  },
  dataAccess: {
    roleList: [ROLE_ITIL, ROLE_ADMIN],
  },

  versionDetails: [
    {
      name: 'V1',
      number: 1,
      state: 'published',
      instructions: `You handle inbound DocFlow access-request incidents under a strict access-governance policy. Act autonomously only on safe, in-scope requests; escalate anything risky.

Step 1: Use "Get Incident Details" to read the incident referenced in the task. Capture its short description and full description.
Step 2: Use "Assess Access Request Risk", passing the incident's full description as request_text. It returns a decision ("auto_resolve" or "escalate") and the reasons.
Step 3a: If the decision is "auto_resolve", the request is standard and within policy. Use "Grant Access and Resolve" to fulfil it and close the incident, then tell the user what you did.
Step 3b: If the decision is "escalate", DO NOT fulfil the request. Use "Escalate to Human Approver", passing the reasons. Then explain to the user exactly which guardrails were triggered (privileged, bulk, external, broad scope) and that the request was routed to a human approver.

Never grant admin/privileged, bulk, external, or all-library access autonomously. When in doubt, escalate.`,
    },
  ],

  tools: [
    {
      active: true,
      name: 'Get Incident Details',
      description: 'Reads an incident by number to retrieve the access request.',
      type: 'crud',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Reading the incident…',
      postMessage: 'Incident details retrieved.',
      inputs: {
        operationName: 'lookup',
        table: 'incident',
        inputFields: [
          { name: 'number', description: 'Incident number or sys_id.', mandatory: true },
        ],
        queryCondition: 'number={{number}}^ORsys_id={{number}}',
        returnFields: [
          { name: 'number' },
          { name: 'short_description' },
          { name: 'description' },
          { name: 'state' },
          { name: 'priority' },
          { name: 'caller_id', referenceConfig: { table: 'sys_user', field: 'name' } },
        ],
      },
    },
    {
      active: true,
      name: 'Assess Access Request Risk',
      description: 'Evaluates an access request against the guardrail policy (privileged, bulk, external, broad scope) and returns a decision with reasons.',
      type: 'script',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Assessing the request against the access policy…',
      postMessage: 'Risk assessment complete.',
      inputs: [
        { name: 'request_text', description: 'The full access-request text to evaluate.', mandatory: true },
      ],
      script: Now.include('./stage3-assess-risk.js'),
    },
    {
      active: true,
      name: 'Grant Access and Resolve',
      description: 'Fulfils a standard, in-scope access request and resolves the incident.',
      type: 'script',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Granting access and resolving…',
      postMessage: 'Request fulfilled and incident resolved.',
      inputs: [
        { name: 'number', description: 'Incident number to resolve.', mandatory: true },
        { name: 'resolution_note', description: 'Optional resolution note for the caller.', mandatory: false },
      ],
      script: Now.include('./stage3-grant-resolve.js'),
    },
    {
      active: true,
      name: 'Escalate to Human Approver',
      description: 'Routes a risky access request to a human approver without fulfilling it.',
      type: 'script',
      recordType: 'custom',
      executionMode: 'autopilot',
      preMessage: 'Escalating to a human approver…',
      postMessage: 'Escalated to a human approver.',
      inputs: [
        { name: 'number', description: 'Incident number to escalate.', mandatory: true },
        { name: 'reasons', description: 'The guardrail reasons that triggered escalation.', mandatory: false },
      ],
      script: Now.include('./stage3-escalate.js'),
    },
  ],

  triggerConfig: [],
});
