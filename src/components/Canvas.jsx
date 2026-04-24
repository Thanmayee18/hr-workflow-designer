import React, { useCallback, useRef } from 'react';
import ReactFlow, { Background, Controls, MiniMap, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { nodeTypes } from '../nodes';
import { useWorkflowStore } from '../hooks/useWorkflowStore';

export default function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode, setSelectedNode, clearSelection } = useWorkflowStore();
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = React.useState(null);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('application/reactflow');
    if (!type || !reactFlowInstance) return;
    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = reactFlowInstance.screenToFlowPosition({
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    });
    addNode(type, position);
  }, [reactFlowInstance, addNode]);

  const onNodeClick = useCallback((_, node) => { setSelectedNode(node.id); }, [setSelectedNode]);
  const onPaneClick = useCallback(() => { clearSelection(); }, [clearSelection]);

  return (
    <div ref={reactFlowWrapper} style={{ flex: 1, position: 'relative', height: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        deleteKeyCode={['Backspace', 'Delete']}
        connectionLineStyle={{ stroke: 'var(--accent-task)', strokeWidth: 2, strokeDasharray: '4 3' }}
        defaultEdgeOptions={{ style: { stroke: 'var(--border)', strokeWidth: 2 }, animated: false }}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="var(--border)" />
        <Controls showInteractive={false} />
        <MiniMap
          nodeColor={(node) => ({
            startNode: '#3fb950', taskNode: '#58a6ff', approvalNode: '#f78166',
            automatedNode: '#d2a8ff', endNode: '#ff7b72',
          }[node.type] || '#8b949e')}
          maskColor="rgba(15,17,23,0.7)"
          style={{ bottom: 8, right: 8 }}
        />
        {nodes.length === 0 && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)', textAlign: 'center',
            color: 'var(--text-muted)', pointerEvents: 'none', userSelect: 'none',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12, opacity: 0.4 }}>⤢</div>
            <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', marginBottom: 6 }}>
              Drop nodes here to start designing
            </div>
            <div style={{ fontSize: 12 }}>Drag a node type from the left sidebar onto this canvas</div>
          </div>
        )}
      </ReactFlow>
    </div>
  );
}