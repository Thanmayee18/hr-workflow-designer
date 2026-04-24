import { useState } from 'react';
import { simulateWorkflow } from '../api/workflowApi';

export function useWorkflowTest() {
  const [logs, setLogs] = useState([]);
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState(null);

  const runTest = async (workflowJson) => {
    setRunning(true);
    setLogs([]);
    setResult(null);
    try {
      const res = await simulateWorkflow(workflowJson);
      setLogs(res.logs);
      setResult(res.success ? 'success' : 'error');
    } catch (err) {
      setLogs([{ type: 'error', time: '--:--:--', message: `Unexpected error: ${err.message}` }]);
      setResult('error');
    } finally {
      setRunning(false);
    }
  };

  const clearLogs = () => { setLogs([]); setResult(null); };

  return { logs, running, result, runTest, clearLogs };
}