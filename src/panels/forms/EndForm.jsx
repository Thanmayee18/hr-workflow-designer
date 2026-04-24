import React from 'react';

export default function EndForm({ data, onChange }) {
  return (
    <div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" value={data.label || ''} onChange={(e) => onChange({ label: e.target.value })} placeholder="End" />
      </div>
      <div className="form-group">
        <label className="form-label">Completion Message</label>
        <textarea className="form-textarea" value={data.message || ''} onChange={(e) => onChange({ message: e.target.value })} placeholder="Workflow completed successfully." />
      </div>
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
          <input
            type="checkbox"
            checked={data.showSummary || false}
            onChange={(e) => onChange({ showSummary: e.target.checked })}
            style={{ width: 14, height: 14, accentColor: 'var(--accent-task)', cursor: 'pointer' }}
          />
          <span className="form-label" style={{ marginBottom: 0 }}>Show execution summary</span>
        </label>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4, marginLeft: 22 }}>
          Appends a step count summary to the logs.
        </div>
      </div>
    </div>
  );
}