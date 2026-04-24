import React from 'react';
import BaseNode from './BaseNode';

export function StartNode(props) {
  const { data } = props;
  const metaCount = data.metadata?.length || 0;
  return (
    <BaseNode {...props} showTarget={false}>
      {metaCount > 0 && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          {metaCount} metadata field{metaCount !== 1 ? 's' : ''}
        </div>
      )}
    </BaseNode>
  );
}

export function TaskNode(props) {
  const { data } = props;
  return (
    <BaseNode {...props}>
      {data.assignee && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', gap: 4, alignItems: 'center' }}>
          <span>👤</span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{data.assignee}</span>
        </div>
      )}
      {data.dueDate && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', display: 'flex', gap: 4, alignItems: 'center', marginTop: 2 }}>
          <span>📅</span><span>{data.dueDate}</span>
        </div>
      )}
    </BaseNode>
  );
}

export function ApprovalNode(props) {
  const { data } = props;
  return (
    <BaseNode {...props}>
      {data.approverRole && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
          Role: <span style={{ color: 'var(--accent-approval)' }}>{data.approverRole}</span>
        </div>
      )}
      {data.autoApproveThreshold && (
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
          Auto ≥ {data.autoApproveThreshold}%
        </div>
      )}
    </BaseNode>
  );
}

export function AutomatedNode(props) {
  const { data } = props;
  return (
    <BaseNode {...props}>
      {data.actionId && (
        <div style={{
          fontSize: 11, color: 'var(--accent-auto)', fontFamily: 'var(--font-mono)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {data.actionId}()
        </div>
      )}
    </BaseNode>
  );
}

export function EndNode(props) {
  const { data } = props;
  return (
    <BaseNode {...props} showSource={false}>
      {data.message && (
        <div style={{
          fontSize: 11, color: 'var(--text-secondary)',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {data.message}
        </div>
      )}
    </BaseNode>
  );
}