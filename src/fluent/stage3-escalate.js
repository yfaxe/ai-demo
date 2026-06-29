(function (inputs) {
    // Scenario B — the request trips a guardrail; do NOT fulfil, route to a human.
    var gr = new GlideRecordSecure('incident');
    if (!gr.get('number', inputs.number)) {
        return { status: 'error', message: 'Incident ' + inputs.number + ' not found' };
    }
    gr.work_notes = 'AI Specialist escalation: this request exceeds the autonomous access policy and has NOT been fulfilled. Routed to a human approver.\nGuardrails triggered: ' + (inputs.reasons || 'policy review required') + '.';
    gr.state = 2;
    gr.incident_state = 2;
    gr.update();
    return { status: 'success', number: inputs.number, action: 'escalated' };
})(inputs);
