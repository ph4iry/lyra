import { addEdge, Background, BackgroundVariant, EdgeTypes, getConnectedEdges, getIncomers, getOutgoers, MarkerType, ReactFlow, useEdgesState, useNodesState } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import DocumentNode from "./DocumentNode";
import OperationNode from "./OperationNode";
import OutputNode from "./OutputNode";
import { PlaceholderNode } from "./PlaceholderOperationNode";
import FloatingEdge from "./edges/FloatingEdge";
import FloatingConnectionLine from "./edges/FloatingConnectionLine";
import { initialElements } from "./edges/initialElements";
import { BaseNode } from "./BaseNode";

export default function Flow() {
  const now = Date.now();
  const defaultNodes = [
    {
      id: `${now}`,
      type: 'document',
      data: {
        source: {
          publisher: 'Vox',
          title: 'Applying to College Today Is Incredibly Public and Incredibly Isolating',
          author: 'Anna North',
          id: `${now}` // timestamp
        },
        value: '',
      },
      position: { x: 100, y: 250 }
    },
    {
      id: 'node-3',
      type: 'placeholder',
      data: {
        operation: 'link'
      },
      position: { x: 550, y: 250 }
    },
  ];

  const defaultEdges = [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-3',
      animated: true,
      type: 'floating'
    }
  ];

  const [initialNodes, setInitialNodes] = useState([]);
  const [initialEdges, setInitialEdges] = useState([]);

  useEffect(() => {
    const { nodes, edges } = initialElements();
    setInitialNodes(nodes);
    setInitialEdges(edges);
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState(defaultNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(defaultEdges);

  const nodeTypes = { 
    document: DocumentNode,
    operation: OperationNode,
    placeholder: PlaceholderNode,
    'output-document': OutputNode
  }

  const edgeTypes = {
    floating: FloatingEdge,
  } as EdgeTypes;

  const onConnect = useCallback(
    (params) => setEdges(addEdge(params, edges)),
    [edges],
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      console.log('deleted', deleted);
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
 
          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge),
          );
 
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              type: 'floating',
              markerEnd: {
                type: MarkerType.Arrow,
              },
              target,
            })),
          );
 
          return [...remainingEdges, ...createdEdges];
        }, edges),
      );
    },
    [nodes, edges],
  );

  

  return (
    <div key='react-flow-instance' className="h-screen w-full">
            {/* nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onNodesDelete={onNodesDelete}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      attributionPosition="top-right" */}

      <ReactFlow
        fitView
        attributionPosition="top-right"
        connectionLineComponent={FloatingConnectionLine}
        {...{ nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes, edgeTypes, onNodesDelete }}
      >
        <Background color="#52525270" variant={BackgroundVariant.Dots} size={3} gap={32} />
        {/* <Panel position="top-right" className="translate-y-14 dark:bg-dark-800-dark bg-dark-800 p-4">top-right</Panel> */}
        {/* <Controls /> */}
      </ReactFlow>
    </div>
  );
}