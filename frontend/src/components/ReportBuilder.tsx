import React, { useCallback, useState } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import type { Connection, Edge, Node, NodeTypes, ReactFlowInstance } from 'reactflow';
import { PrimaryButton, DatePicker, Dropdown } from '@fluentui/react';
import type { IDropdownOption } from '@fluentui/react';
import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import 'reactflow/dist/style.css';

interface NodeData {
  label: string;
  filters?: {
    dateFrom?: Date;
    dateTo?: Date;
    role?: string;
  };
}

const DataSourceNode = ({ data }: { data: NodeData }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#e3f2fd' }}>
      <strong>Data Source</strong>
      <br />
      {data.label}
    </div>
  );
};

const FilterNode = ({ data }: { data: NodeData }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#fff3e0' }}>
      <strong>Filter</strong>
      <br />
      {data.label}
    </div>
  );
};

const OutputNode = ({ data }: { data: NodeData }) => {
  return (
    <div style={{ padding: 10, border: '1px solid #ddd', borderRadius: 5, background: '#e8f5e8' }}>
      <strong>Output</strong>
      <br />
      {data.label}
    </div>
  );
};

const nodeTypes: NodeTypes = {
  dataSource: DataSourceNode,
  filter: FilterNode,
  output: OutputNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const ReportBuilder = () => {
  const { instance, accounts } = useMsal();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

  const onNodeClick = useCallback((_event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const updateNodeData = useCallback((nodeId: string, data: Partial<NodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, [setNodes]);

  const handleGenerateReport = useCallback(async () => {
    if (!reactFlowInstance || !accounts[0]) return;
    const flow = reactFlowInstance.toObject();

    const tokenResponse = await instance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });

    // Send flow to Netlify function
    const response = await fetch('/.netlify/functions/generate-report', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenResponse.accessToken}`,
      },
      body: JSON.stringify(flow),
    });
    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf'; // or excel based on output
      a.click();
      window.URL.revokeObjectURL(url);
    }
  }, [reactFlowInstance, instance, accounts]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (reactFlowInstance) {
        const type = event.dataTransfer.getData('application/reactflow');
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode: Node = {
          id: `${type}-${Date.now()}`,
          type,
          position,
          data: { label: type === 'dataSource' ? 'Select Source' : type === 'filter' ? 'Configure Filter' : 'Select Format' },
        };
        setNodes((nds) => nds.concat(newNode));
      }
    },
    [reactFlowInstance, setNodes]
  );

  const roleOptions: IDropdownOption[] = [
    { key: 'admin', text: 'Admin' },
    { key: 'user', text: 'User' },
    { key: 'manager', text: 'Manager' },
  ];

  return (
    <div style={{ display: 'flex', height: '80vh' }}>
      <div style={{ width: 250, padding: 10, borderRight: '1px solid #ddd', background: '#f5f5f5' }}>
        <h3>Drag Nodes</h3>
        <div
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'dataSource')}
          style={{ padding: 10, margin: 5, border: '1px solid #ccc', cursor: 'grab', background: '#e3f2fd' }}
        >
          Data Source: Users
        </div>
        <div
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'dataSource')}
          style={{ padding: 10, margin: 5, border: '1px solid #ccc', cursor: 'grab', background: '#e3f2fd' }}
        >
          Data Source: Groups
        </div>
        <div
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'filter')}
          style={{ padding: 10, margin: 5, border: '1px solid #ccc', cursor: 'grab', background: '#fff3e0' }}
        >
          Filter
        </div>
        <div
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'output')}
          style={{ padding: 10, margin: 5, border: '1px solid #ccc', cursor: 'grab', background: '#e8f5e8' }}
        >
          Output: PDF
        </div>
        <div
          draggable
          onDragStart={(event) => event.dataTransfer.setData('application/reactflow', 'output')}
          style={{ padding: 10, margin: 5, border: '1px solid #ccc', cursor: 'grab', background: '#e8f5e8' }}
        >
          Output: Excel
        </div>
        <PrimaryButton onClick={handleGenerateReport} style={{ marginTop: 20 }}>
          Generate Report
        </PrimaryButton>
      </div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1 }}>
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
            nodeTypes={nodeTypes}
            fitView
          >
            <MiniMap />
            <Controls />
            <Background />
          </ReactFlow>
        </div>
        {selectedNode && selectedNode.type === 'filter' && (
          <div style={{ padding: 10, borderTop: '1px solid #ddd', background: '#f9f9f9' }}>
            <h4>Configure Filter</h4>
            <DatePicker
              label="Date From"
              value={selectedNode.data.filters?.dateFrom}
              onSelectDate={(date) => updateNodeData(selectedNode.id, { filters: { ...selectedNode.data.filters, dateFrom: date } })}
            />
            <DatePicker
              label="Date To"
              value={selectedNode.data.filters?.dateTo}
              onSelectDate={(date) => updateNodeData(selectedNode.id, { filters: { ...selectedNode.data.filters, dateTo: date } })}
            />
            <Dropdown
              label="Role"
              options={roleOptions}
              selectedKey={selectedNode.data.filters?.role}
              onChange={(_e, option) => updateNodeData(selectedNode.id, { filters: { ...selectedNode.data.filters, role: option?.key as string } })}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportBuilder;