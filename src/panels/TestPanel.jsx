import React from 'react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import { useWorkflowTest } from '../hooks/useWorkflowTest';

const LOG_COLORS = {
  info: 'var(--text-secondary)', success: 'var(--accent-start)',
  warn: 'var(--accent-warn)', error: 'var(--accent-end)', debug: 'var(--text-muted)',
};
const LOG_BG = { error: '#ff7b7211', warn: '#e3b34111', success: '#3fb95011' };

export default function TestPanel() {
  const { exportWorkflow, toggleTestPanel } = useWorkflowStore();
  const { logs, running, result, runTest, clearLogs } = useWorkflowTest();

  const handleRun = () => { runTest(exportWorkflow()); };

  const handleExport = () => {
    const json = JSON.stringify(exportWorkflow(), null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'workflow.json'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, height: 280,
      background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', zIndex: 10,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 14px', borderBottom: '1px solid var(--border)', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>
            WORKFLOW TEST CONSOLE
          </span>
          {result && (
            <span style={{
              fontSize: 10, padding: '2px 7px', borderRadius: 999,
              background: result === 'success' ? '#3fb95022' : '#ff7b7222',
              color: result === 'success' ? 'var(--accent-start)' : 'var(--accent-end)',
              fontFamily: 'var(--font-mono)',
            }}>
              {result === 'success' ? '● PASSED' : '● FAILED'}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button className="btn btn-secondary" onClick={handleExport} style={{ fontSize: 11 }}>↓ Export JSON</button>
          <button className="btn btn-secondary" onClick={clearLogs} style={{ fontSize: 11 }} disabled={running || logs.length === 0}>Clear</button>
          <button className="btn btn-primary" onClick={handleRun} disabled={running} style={{ fontSize: 11 }}>
            {running ? '⟳ Running...' : '▶ Run Simulation'}
          </button>
          <button className="btn btn-ghost" onClick={toggleTestPanel} style={{ fontSize: 16, padding: '2px 8px' }}>×</button>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 0', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
        {logs.length === 0 && !running && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-muted)', fontSize: 12, fontFamily: 'var(--font-sans)' }}>
            Click "Run Simulation" to validate and test your workflow
          </div>
        )}
        {logs.map((log, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, padding: '2px 14px', background: LOG_BG[log.type] || 'transparent' }}>
            <span style={{ color: 'var(--text-muted)', flexShrink: 0, fontSize: 10, paddingTop: 1 }}>{log.time}</span>
            <span style={{ color: LOG_COLORS[log.type] || 'var(--text-primary)' }}>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}