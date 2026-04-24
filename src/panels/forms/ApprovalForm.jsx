import React from 'react';

const APPROVER_ROLES = ['Manager', 'HR Director', 'Department Head', 'VP of People', 'CEO', 'Legal', 'Finance', 'Custom...'];

export default function ApprovalForm({ data, onChange }) {
  const isCustom = !APPROVER_ROLES.slice(0, -1).includes(data.approverRole);

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" value={data.label || ''} onChange={(e) => onChange({ label: e.target.value })} placeholder="Approval step name" />
      </div>
      <div className="form-group">
        <label className="form-label">Approver Role</label>
        <select
          className="form-select"
          value={isCustom ? 'Custom...' : data.approverRole || 'Manager'}
          onChange={(e) => onChange({ approverRole: e.target.value === 'Custom...' ? '' : e.target.value })}
        >
          {APPROVER_ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      {isCustom && (
        <div className="form-group">
          <label className="form-label">Custom Role</label>
          <input className="form-input" value={data.approverRole || ''} onChange={(e) => onChange({ approverRole: e.target.value })} placeholder="Enter custom role..." autoFocus />
        </div>
      )}
      <div className="form-group">
        <label className="form-label">Auto-Approve Threshold (%) <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>optional</span></label>
        <input type="number" className="form-input" value={data.autoApproveThreshold || ''} onChange={(e) => onChange({ autoApproveThreshold: e.target.value })} placeholder="e.g. 80" min="0" max="100" />
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>Leave blank to require manual approval always.</div>
      </div>
    </div>
  );
}