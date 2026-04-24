import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

let nodeCounter = 1;

export const useWorkflowStore = create((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  testPanelOpen: false,

  onNodesChange: (changes) =>
    set((state) => ({ nodes: applyNodeChanges(changes, state.nodes) })),

  onEdgesChange: (changes) =>
    set((state) => ({ edges: applyEdgeChanges(changes, state.edges) })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection, id: `e-${Date.now()}`, animated: false }, state.edges),
    })),

  addNode: (type, position) => {
    const id = `node_${nodeCounter++}`;
    const defaults = getNodeDefaults(type);
    set((state) => ({ nodes: [...state.nodes, { id, type, position, data: defaults }] }));
  },

  updateNodeData: (nodeId, data) =>
    set((state) => ({
      nodes: state.nodes.map((n) => n.id === nodeId ? { ...n, data: { ...n.data, ...data } } : n),
    })),

  deleteNode: (nodeId) =>
    set((state) => ({
      nodes: state.nodes.filter((n) => n.id !== nodeId),
      edges: state.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
      selectedNodeId: state.selectedNodeId === nodeId ? null : state.selectedNodeId,
    })),

  deleteEdge: (edgeId) =>
    set((state) => ({ edges: state.edges.filter((e) => e.id !== edgeId) })),

  setSelectedNode: (nodeId) => set({ selectedNodeId: nodeId }),
  clearSelection: () => set({ selectedNodeId: null }),

  getSelectedNode: () => {
    const { nodes, selectedNodeId } = get();
    return nodes.find((n) => n.id === selectedNodeId) || null;
  },

  toggleTestPanel: () => set((state) => ({ testPanelOpen: !state.testPanelOpen })),

  exportWorkflow: () => {
    const { nodes, edges } = get();
    return { nodes, edges };
  },

  clearWorkflow: () => set({ nodes: [], edges: [], selectedNodeId: null }),
}));

function getNodeDefaults(type) {
  switch (type) {
    case 'startNode': return { label: 'Start', metadata: [] };
    case 'taskNode': return { label: 'New Task', description: '', assignee: '', dueDate: '', customFields: [] };
    case 'approvalNode': return { label: 'Approval', approverRole: 'Manager', autoApproveThreshold: '' };
    case 'automatedNode': return { label: 'Automated Step', actionId: '', params: {} };
    case 'endNode': return { label: 'End', message: 'Workflow completed successfully.', showSummary: false };
    default: return { label: type };
  }
}