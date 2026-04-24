import React from 'react';
import { NODE_DEFINITIONS } from '../nodes';

export default function Sidebar() {
  const onDragStart = (e, nodeType) => {
    e.dataTransfer.setData('application/reactflow', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside style={{
      width: 200, background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{ padding: '14px 14px 12px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.15em', color: 'var(--accent-task)', fontFamily: 'var(--font-mono)' }}>
          HR WORKFLOW
        </div>
        <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2, letterSpacing: '0.05em' }}>
          DESIGNER v1.0
        </div>
      </div>

      <div className="section-header">Node Types</div>

      <div style={{ padding: '8px', display: 'flex', flexDirection: 'column', gap: 4, overflowY: 'auto' }}>
        {NODE_DEFINITIONS.map((def) => (
          <div
            key={def.type}
            draggable
            onDragStart={(e) => onDragStart(e, def.type)}
            style={{
              background: 'var(--bg-primary)', border: '1px solid var(--border)',
              borderLeft: `3px solid ${def.color}`, borderRadius: 'var(--radius)',
              padding: '8px 10px', cursor: 'grab', userSelect: 'none', transition: 'all 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-elevated)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-primary)'; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 14 }}>{def.icon}</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>{def.label}</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 1 }}>{def.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 'auto', padding: '10px 12px', borderTop: '1px solid var(--border)',
        fontSize: 10, color: 'var(--text-muted)', lineHeight: 1.6,
      }}>
        <div style={{ fontWeight: 600, marginBottom: 4, color: 'var(--text-secondary)' }}>TIPS</div>
        <div>• Drag nodes to canvas</div>
        <div>• Connect handle → handle</div>
        <div>• Click node to edit</div>
        <div>• Delete key removes selection</div>
      </div>
    </aside>
  );
}