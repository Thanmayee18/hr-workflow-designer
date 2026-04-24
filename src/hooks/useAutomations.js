import { useState, useEffect } from 'react';
import { getAutomations } from '../api/workflowApi';

export function useAutomations() {
  const [automations, setAutomations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAutomations().then((data) => {
      setAutomations(data);
      setLoading(false);
    });
  }, []);

  return { automations, loading };
}