import React from 'react';

export default function StartForm({ data, onChange }) {
  const handleMetaChange = (index, key, value) => {
    const updated = [...(data.metadata || [])];
    updated[index] = { ...updated[index], [key]: value };
    onChange({ metadata: updated });
  };
  const addMeta = () => onChange({ metadata: [...(data.metadata || []), { key: '', value: '' }] });
  const removeMeta = (index) => {
    const updated = [...(data.metadata || [])];
    updated.splice(index, 1);
    onChange({ metadata: updated });
  };

  return (
    <div>
      <div className="form-group">
        <label className="form-label">Title</label>
        <input className="form-input" value={data.label || ''} onChange={(e) => onChange({ label: e.target.value })} placeholder="Start" />
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-secondary)', marginBottom: 8 }}>
        Metadata Fields
      </div>
      {(data.metadata || []).map((item, i) => (
        <div key={i} style={{ display: 'flex', gap: 6, marginBottom: 6, alignItems: 'center' }}>
          <input className="form-input" value={item.key} onChange={(e) => handleMetaChange(i, 'key', e.target.value)} placeholder="Key" style={{ flex: 1 }} />
          <input className="form-input" value={item.value} onChange={(e) => handleMetaChange(i, 'value', e.target.value)} placeholder="Value" style={{ flex: 1 }} />
          <button className="btn btn-ghost" onClick={() => removeMeta(i)} style={{ padding: '4px 6px', color: 'var(--accent-end)' }}>×</button>
        </div>
      ))}
      <button className="btn btn-secondary" onClick={addMeta} style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}>+ Add Field</button>
    </div>
  );
}