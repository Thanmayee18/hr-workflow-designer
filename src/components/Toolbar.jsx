import React from 'react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';

export default function Toolbar() {
  const { clearWorkflow, toggleTestPanel, testPanelOpen, nodes, edges } = useWorkflowStore();

  const handleClear = () => {
    if (nodes.length === 0 || confirm('Clear the entire workflow? This cannot be undone.')) {
      clearWorkflow();
    }
  };

  return (
    <header style={{
      height: 44, background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 14px', flexShrink: 0, zIndex: 20,
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          <span><span style={{ color: 'var(--text-secondary)' }}>{nodes.length}</span> nodes</span>
          <span><span style={{ color: 'var(--text-secondary)' }}>{edges.length}</span> edges</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        <button className="btn btn-secondary" onClick={handleClear} style={{ fontSize: 11 }}>🗑 Clear</button>
        <button className={`btn ${testPanelOpen ? 'btn-primary' : 'btn-secondary'}`} onClick={toggleTestPanel} style={{ fontSize: 11 }}>
          {testPanelOpen ? '⏹ Close Console' : '▶ Test Workflow'}
        </button>
      </div>
    </header>
  );
}