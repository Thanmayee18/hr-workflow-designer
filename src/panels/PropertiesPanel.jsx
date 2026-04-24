import React, { useCallback } from 'react';
import { useWorkflowStore } from '../hooks/useWorkflowStore';
import StartForm from './forms/StartForm';
import TaskForm from './forms/TaskForm';
import ApprovalForm from './forms/ApprovalForm';
import AutomatedForm from './forms/AutomatedForm';
import EndForm from './forms/EndForm';

const FORM_MAP = {
  startNode: StartForm,
  taskNode: TaskForm,
  approvalNode: ApprovalForm,
  automatedNode: AutomatedForm,
  endNode: EndForm,
};

const TYPE_LABELS = {
  startNode: 'Start Node', taskNode: 'Task Node', approvalNode: 'Approval Node',
  automatedNode: 'Automated Node', endNode: 'End Node',
};

export default function PropertiesPanel() {
  const { getSelectedNode, updateNodeData, deleteNode, clearSelection } = useWorkflowStore();
  const selectedNode = getSelectedNode();

  const handleChange = useCallback(
    (data) => { if (selectedNode) updateNodeData(selectedNode.id, data); },
    [selectedNode, updateNodeData]
  );

  if (!selectedNode) {
    return (
      <aside style={{
        width: 260, background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', color: 'var(--text-muted)', flexShrink: 0,
      }}>
        <div style={{ fontSize: 28, marginBottom: 10 }}>☰</div>
        <div style={{ fontSize: 12, textAlign: 'center', lineHeight: 1.6, padding: '0 24px' }}>
          Select a node to edit its properties
        </div>
      </aside>
    );
  }

  const FormComponent = FORM_MAP[selectedNode.type];

  return (
    <aside style={{
      width: 260, background: 'var(--bg-secondary)', borderLeft: '1px solid var(--border)',
      display: 'flex', flexDirection: 'column', flexShrink: 0, overflow: 'hidden',
    }}>
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-primary)' }}>
            {TYPE_LABELS[selectedNode.type]}
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: 1 }}>
            {selectedNode.id}
          </div>
        </div>
        <button className="btn btn-ghost" onClick={clearSelection} style={{ fontSize: 18, padding: '2px 6px' }}>×</button>
      </div>

      <div style={{ overflowY: 'auto', flex: 1, padding: '12px 14px' }}>
        {FormComponent
          ? <FormComponent data={selectedNode.data} onChange={handleChange} />
          : <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>No form for this node type.</div>
        }
      </div>

      <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)' }}>
        <button
          className="btn btn-danger"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => deleteNode(selectedNode.id)}
        >
          🗑 Delete Node
        </button>
      </div>
    </aside>
  );
}