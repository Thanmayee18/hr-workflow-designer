import { StartNode, TaskNode, ApprovalNode, AutomatedNode, EndNode } from './NodeTypes';

export const nodeTypes = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedNode: AutomatedNode,
  endNode: EndNode,
};

export const NODE_DEFINITIONS = [
  { type: 'startNode', label: 'Start', icon: '▶', description: 'Workflow entry point', color: 'var(--accent-start)' },
  { type: 'taskNode', label: 'Task', icon: '📋', description: 'Manual task assignment', color: 'var(--accent-task)' },
  { type: 'approvalNode', label: 'Approval', icon: '✅', description: 'Requires human approval', color: 'var(--accent-approval)' },
  { type: 'automatedNode', label: 'Automated', icon: '⚡', description: 'Runs an automation', color: 'var(--accent-auto)' },
  { type: 'endNode', label: 'End', icon: '⏹', description: 'Workflow completion', color: 'var(--accent-end)' },
];