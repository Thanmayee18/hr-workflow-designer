import React from 'react';
import Sidebar from './panels/Sidebar';
import Canvas from './components/Canvas';
import PropertiesPanel from './panels/PropertiesPanel';
import TestPanel from './panels/TestPanel';
import Toolbar from './components/Toolbar';
import { useWorkflowStore } from './hooks/useWorkflowStore';

export default function App() {
  const testPanelOpen = useWorkflowStore((s) => s.testPanelOpen);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Toolbar />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Sidebar />
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Canvas />
          {testPanelOpen && <TestPanel />}
        </div>
        <PropertiesPanel />
      </div>
    </div>
  );
}