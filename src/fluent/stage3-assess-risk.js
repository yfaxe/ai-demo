(function (inputs) {
    // Access-governance guardrail. Returns a decision + the reasons it fired.
    // Any single risk axis forces escalation — the agent must not act alone.
    var t = String(inputs.request_text || '').toLowerCase();
    var reasons = [];

    if (/\b(admin|administrator|full rights|full access|full control|manage permission|manage permissions|all permissions)\b/.test(t)) {
        reasons.push('Privileged access (Admin / full control)');
    }
    if (/(all|every|entire)[^.]{0,25}librar/.test(t) || t.indexOf('all docflow libraries') > -1) {
        reasons.push('Broad scope (all libraries)');
    }
    if (/\b(external|contractor|contractors|non-employee|third party|third-party|vendor)\b/.test(t) || t.indexOf('@globaldoc') > -1) {
        reasons.push('External / non-employee accounts');
    }
    var atCount = (t.match(/@/g) || []).length;
    if (/\b(bulk|multiple|several|six)\b/.test(t) || /\b[2-9][0-9]*\s+(users|contractors|people|accounts)\b/.test(t) || atCount >= 3) {
        reasons.push('Bulk request (multiple users)');
    }

    var decision = reasons.length > 0 ? 'escalate' : 'auto_resolve';
    return {
        decision: decision,
        reasons: reasons.join('; ') || 'Standard, single-user, in-scope request',
        risk_count: reasons.length,
        status: 'success'
    };
})(inputs);
