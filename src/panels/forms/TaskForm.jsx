import React from 'react';

export default function TaskForm({ data, onChange }) {
  const handleCustomChange = (index, key, value) => {
    const updated = [...(data.customFields || [])];
    updated[index] = { ...updated[index], [key]: value };
    onChange({ customFields: updated });
  };
  const addCustomField = () => onChange({ customFields: [...(data.customFields || []), { name: '', value: '' }] });
  const removeCustomField = (index) => {
    const updated = [...(data.customFields || [])];
    updated.splice(index, 1);
    onChange({ customFields: updated });
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" value={data.label || ''} onChange={(e) => onChange({ label: e.target.value })} placeholder="Task name" />
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-textarea" value={data.description || ''} onChange={(e) => onChange({ description: e.target.value })} placeholder="Describe what this task involves..." />
      </div>
      <div className="form-group">
        <label className="form-label">Assignee</label>
        <input className="form-input" value={data.assignee || ''} onChange={(e) => onChange({ assignee: e.target.value })} placeholder="e.g. John Smith or HR Team" />
      </div>
      <div className="form-group">
        <label className="form-label">Due Date</label>
        <input type="date" className="form-input" value={data.dueDate || ''} onChange={(e) => onChange({ dueDate: e.target.value })} style={{ colorScheme: 'dark' }} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 8 }}>
        Custom Fields (optional)
      </div>
      {(data.customFields || []).map((field, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
          <input className="form-input" value={field.name} onChange={(e) => handleCustomChange(i, 'name', e.target.value)} placeholder="Field name" style={{ flex: 1 }} />
          <input className="form-input" value={field.value} onChange={(e) => handleCustomChange(i, 'value', e.target.value)} placeholder="Value" style={{ flex: 1 }} />
          <button className="btn btn-ghost" onClick={() => removeCustomField(i)} style={{ padding: '4px 6px', color: 'var(--accent-end)' }}>×</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={addCustomField} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>+ Add Custom Field</button>
    </div>
  );
}