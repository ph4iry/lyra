import React, { useCallback, ReactNode, forwardRef } from "react";
import {
  useReactFlow,
  useNodeId,
  NodeProps,
  Handle,
  Position,
  MarkerType,
} from "@xyflow/react";
import { BaseNode } from "@/renderer/components/flow/BaseNode";

export type PlaceholderNodeProps = Partial<NodeProps> & {
  children?: ReactNode;
};

export const PlaceholderNode = forwardRef<HTMLDivElement, PlaceholderNodeProps>(
  ({ selected }, ref) => {
    const id = useNodeId();
    const { setNodes, setEdges } = useReactFlow();

    const handleClick = useCallback(() => {
      if (!id) return;

      setNodes((nodes) => {
        const updatedNodes = nodes.map((node) => {
          if (node.id === id) {
            return {
              ...node,
              data: { ...node.data, operation: "unknown" },
              type: "operation",
            };
          }
          return node;
        });

        // Find the position of the current node
        const currentNode = nodes.find((node) => node.id === id);
        const currentPositionY = currentNode?.position?.y || 0;

        // Add a new document node 200px below the transformed placeholder
        const newDocumentNode = {
          id: `${id}-output`,
          type: "output-document",
          position: { x: (currentNode?.position?.x || 0) + 300, y: currentPositionY },
          data: {
            label: "output document",
            source: { 
              author: "Unknown",
              title: "Unknown",
              publisher: "Unknown",
              id: Date.now(), // timestamp
            }
          },
        };

        return [...updatedNodes, newDocumentNode];
      });

      setEdges((edges) => {
        const updatedEdges = edges.map((edge) =>
          edge.target === id ? {
            ...edge,
            animated: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          } : edge,
        );

        return [
          ...updatedEdges,
          {
            id: `${id}-to-output`,
            source: id,
            target: `${id}-output`,
            type: "bezier",
            animated: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
            },
          },
        ];
      });
    }, [id, setEdges, setNodes]);

    return (
      <BaseNode
        ref={ref}
        selected={selected}
        className="border-dashed border-neutral-400 border p-2 text-center bg-neutral-900/30 text-neutral-400 shadow-none uppercase font-semibold"
        onClick={handleClick}
      >
        Add operation
        <Handle
          type="target"
          style={{ visibility: "hidden" }}
          position={Position.Left}
          isConnectable={false}
        />
        <Handle
          type="source"
          style={{ visibility: "hidden" }}
          position={Position.Right}
          isConnectable={false}
        />
      </BaseNode>
    );
  },
);

PlaceholderNode.displayName = "PlaceholderNode";
