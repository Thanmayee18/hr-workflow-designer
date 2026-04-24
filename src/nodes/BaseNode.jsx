import React from 'react';
import { Handle, Position } from 'reactflow';
import { useWorkflowStore } from '../hooks/useWorkflowStore';

const COLORS = {
  startNode: 'var(--accent-start)',
  taskNode: 'var(--accent-task)',
  approvalNode: 'var(--accent-approval)',
  automatedNode: 'var(--accent-auto)',
  endNode: 'var(--accent-end)',
};

const ICONS = {
  startNode: '▶',
  taskNode: '📋',
  approvalNode: '✅',
  automatedNode: '⚡',
  endNode: '⏹',
};

const LABELS = {
  startNode: 'START',
  taskNode: 'TASK',
  approvalNode: 'APPROVAL',
  automatedNode: 'AUTO',
  endNode: 'END',
};

export default function BaseNode({ id, type, data, selected, showSource = true, showTarget = true, children }) {
  const { setSelectedNode, deleteNode } = useWorkflowStore();
  const accentColor = COLORS[type] || 'var(--text-secondary)';

  return (
    <div
      onClick={() => setSelectedNode(id)}
      style={{
        background: 'var(--bg-secondary)',
        border: `1px solid ${selected ? accentColor : 'var(--border)'}`,
        borderTop: `3px solid ${accentColor}`,
        borderRadius: 'var(--radius-lg)',
        minWidth: 180,
        maxWidth: 240,
        boxShadow: selected ? `0 0 0 2px ${accentColor}22, 0 4px 16px #00000040` : '0 2px 8px #00000030',
        transition: 'all 0.15s',
        cursor: 'pointer',
      }}
    >
      {showTarget && <Handle type="target" position={Position.Top} style={{ top: -6 }} />}

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '7px 10px 5px',
        borderBottom: '1px solid var(--border-subtle)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 13 }}>{ICONS[type]}</span>
          <span style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: accentColor,
            fontFamily: 'var(--font-mono)',
          }}>
            {LABELS[type]}
          </span>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); deleteNode(id); }}
          style={{
            background: 'none', border: 'none', color: 'var(--text-muted)',
            fontSize: 14, lineHeight: 1, padding: '0 2px', cursor: 'pointer', opacity: 0,
          }}
          className="node-delete-btn"
          title="Delete node"
        >×</button>
      </div>

      <div style={{ padding: '8px 10px 10px' }}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: 'var(--text-primary)',
          marginBottom: children ? 6 : 0, whiteSpace: 'nowrap',
          overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {data.label || 'Untitled'}
        </div>
        {children}
      </div>

      {showSource && <Handle type="source" position={Position.Bottom} style={{ bottom: -6 }} />}

      <style>{`.react-flow__node:hover .node-delete-btn { opacity: 1 !important; }`}</style>
    </div>
  );
}