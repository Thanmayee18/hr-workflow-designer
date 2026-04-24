import React from 'react';
import { useAutomations } from '../../hooks/useAutomations';

export default function AutomatedForm({ data, onChange }) {
  const { automations, loading } = useAutomations();
  const selectedAutomation = automations.find((a) => a.id === data.actionId);

  const handleActionChange = (actionId) => {
    const auto = automations.find((a) => a.id === actionId);
    const params = {};
    auto?.params.forEach((p) => { params[p] = data.params?.[p] || ''; });
    onChange({ actionId, params });
  };

  const handleParamChange = (paramKey, value) => {
    onChange({ params: { ...data.params, [paramKey]: value } });
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" value={data.label || ''} onChange={(e) => onChange({ label: e.target.value })} placeholder="Automation step name" />
      </div>
      <div className="form-group">
        <label className="form-label">Action</label>
        <select className="form-select" value={data.actionId || ''} onChange={(e) => handleActionChange(e.target.value)} disabled={loading}>
          <option value="">{loading ? 'Loading automations...' : 'Select an action...'}</option>
          {automations.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </div>
      {selectedAutomation && selectedAutomation.params.length > 0 && (
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 8 }}>
            Parameters
          </div>
          {selectedAutomation.params.map((param) => (
            <div className="form-group" key={param}>
              <label className="form-label">{param}</label>
              <input className="form-input" value={data.params?.[param] || ''} onChange={(e) => handleParamChange(param, e.target.value)} placeholder={`Enter ${param}...`} style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}