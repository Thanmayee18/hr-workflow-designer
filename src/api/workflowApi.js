export async function getAutomations() {
  await delay(120);
  return [
    { id: 'send_email', label: 'Send Email', params: ['to', 'subject', 'body'] },
    { id: 'generate_doc', label: 'Generate Document', params: ['template', 'recipient', 'format'] },
    { id: 'update_hris', label: 'Update HRIS Record', params: ['employee_id', 'field', 'value'] },
    { id: 'send_slack', label: 'Send Slack Notification', params: ['channel', 'message'] },
    { id: 'create_jira', label: 'Create Jira Ticket', params: ['project', 'summary', 'assignee'] },
    { id: 'schedule_meeting', label: 'Schedule Meeting', params: ['attendees', 'duration', 'agenda'] },
  ];
}

export async function simulateWorkflow(workflowJson) {
  await delay(400);
  const { nodes, edges } = workflowJson;
  const logs = [];
  const errors = [];

  const startNodes = nodes.filter((n) => n.type === 'startNode');
  const endNodes = nodes.filter((n) => n.type === 'endNode');

  if (startNodes.length === 0) errors.push({ level: 'error', message: 'Workflow must have a Start node.' });
  if (startNodes.length > 1) errors.push({ level: 'warn', message: 'Multiple Start nodes detected.' });
  if (endNodes.length === 0) errors.push({ level: 'error', message: 'Workflow must have an End node.' });

  const connectedNodeIds = new Set();
  edges.forEach((e) => { connectedNodeIds.add(e.source); connectedNodeIds.add(e.target); });
  const disconnected = nodes.filter((n) => !connectedNodeIds.has(n.id) && nodes.length > 1);
  disconnected.forEach((n) => {
    errors.push({ level: 'warn', message: `Node "${n.data?.label || n.id}" is not connected.` });
  });

  if (errors.some((e) => e.level === 'error')) {
    return {
      success: false,
      logs: [
        { type: 'error', time: ts(), message: '❌ Workflow validation failed.' },
        ...errors.map((e) => ({ type: e.level, time: ts(), message: e.message })),
      ],
    };
  }

  logs.push({ type: 'info', time: ts(), message: '▶ Starting workflow simulation...' });
  errors.forEach((e) => logs.push({ type: e.level, time: ts(), message: `⚠ ${e.message}` }));

  const ordered = topologicalSort(nodes, edges);

  for (const node of ordered) {
    await delay(80);
    const label = node.data?.label || node.type;
    switch (node.type) {
      case 'startNode':
        logs.push({ type: 'info', time: ts(), message: `🟢 [START] "${label}" — Workflow initiated.` });
        break;
      case 'taskNode':
        logs.push({ type: 'info', time: ts(), message: `📋 [TASK] "${label}" — Assigned to ${node.data?.assignee || 'Unassigned'} (Due: ${node.data?.dueDate || 'No due date'})` });
        logs.push({ type: 'success', time: ts(), message: `   ✓ Task created and notification sent.` });
        break;
      case 'approvalNode':
        if (node.data?.autoApproveThreshold) {
          logs.push({ type: 'info', time: ts(), message: `✅ [APPROVAL] "${label}" — Auto-approved (threshold: ${node.data.autoApproveThreshold}%)` });
        } else {
          logs.push({ type: 'info', time: ts(), message: `🔍 [APPROVAL] "${label}" — Pending review by ${node.data?.approverRole || 'Manager'}` });
          logs.push({ type: 'success', time: ts(), message: `   ✓ Approval request sent.` });
        }
        break;
      case 'automatedNode':
        logs.push({ type: 'info', time: ts(), message: `⚡ [AUTO] "${label}" — Executing: ${node.data?.actionId || 'unknown'}` });
        logs.push({ type: 'success', time: ts(), message: `   ✓ Automation completed successfully.` });
        break;
      case 'endNode':
        logs.push({ type: 'info', time: ts(), message: `🔴 [END] "${label}" — ${node.data?.message || 'Workflow complete.'}` });
        if (node.data?.showSummary) logs.push({ type: 'info', time: ts(), message: `   📊 Summary: ${ordered.length} steps executed.` });
        break;
      default:
        logs.push({ type: 'info', time: ts(), message: `[${node.type}] "${label}" — processed.` });
    }
  }

  logs.push({ type: 'success', time: ts(), message: `✔ Simulation complete. ${ordered.length} node(s) processed.` });
  return { success: true, logs };
}

function delay(ms) { return new Promise((r) => setTimeout(r, ms)); }
function ts() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }

function topologicalSort(nodes, edges) {
  const nodeMap = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const inDegree = Object.fromEntries(nodes.map((n) => [n.id, 0]));
  const adj = Object.fromEntries(nodes.map((n) => [n.id, []]));
  edges.forEach(({ source, target }) => {
    if (adj[source]) adj[source].push(target);
    if (inDegree[target] !== undefined) inDegree[target]++;
  });
  const queue = nodes.filter((n) => inDegree[n.id] === 0).map((n) => n.id);
  const result = [];
  while (queue.length > 0) {
    const id = queue.shift();
    if (nodeMap[id]) result.push(nodeMap[id]);
    adj[id]?.forEach((nid) => { inDegree[nid]--; if (inDegree[nid] === 0) queue.push(nid); });
  }
  const sortedIds = new Set(result.map((n) => n.id));
  nodes.forEach((n) => { if (!sortedIds.has(n.id)) result.push(n); });
  return result;
}