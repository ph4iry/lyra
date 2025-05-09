import React from 'react';
import { BaseNode } from './BaseNode';
import { RefreshCw } from 'lucide-react';
import { getIncomers, getOutgoers, Node, NodeProps, Position } from '@xyflow/react';
import { motion } from 'motion/react';
import { BaseHandle } from './BaseHandle';
import { useReactFlow } from '@xyflow/react';
// import { Source } from './DocumentNode';
interface OutputNodeProps {
  label: string;
  onReload: () => void;
}

// { selected, data }: NodeProps<Node<{ operation: DocumentOperation, output: number }>>

export default function OutputNode({ selected, data }: NodeProps<Node<{ id: string, label: string }>>) {
  const { label } = data;

  const reactFlowInstance = useReactFlow();

  const node = reactFlowInstance.getNode(data.id);
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();

  const incomers = getIncomers(node, nodes, edges);
  const outgoers = getOutgoers(node, nodes, edges);

  const [ source ] = incomers;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode selected={selected} className="p-5 bg-dark-800">
        <div className="flex flex-nowrap justify-between items-center">
          <span className="uppercase font-semibold text-neutral-700 whitespace-nowrap">{label}</span>
            <button
              className="flex gap-4 items-center bg-neutral-500/30 p-2 rounded pointer-events-auto disabled:opacity-50"
              onClick={(e) => {
                // dont run if spin animation is running
                if (document.querySelector('.spin-animation') !== null) return;
                const button = e.currentTarget;
                button.classList.add('spin-animation');
                setTimeout(() => button.classList.remove('spin-animation'), 1000);
              }}
            >
              <span className="text-sm text-neutral-500">Rerun</span>
              <RefreshCw size={16} />
            </button>
        </div>
        <div>
          {(source as Node)?.data.operation as string}
        </div>
        <div>
          <span className="text-sm text-neutral-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum ipsam, ab repudiandae quae reiciendis non nemo laudantium quos quidem in veniam nesciunt odit repellendus deleniti quis, ex sequi excepturi. Nihil!</span>
        </div>
        <BaseHandle type="source" position={Position.Right} className="" />
        <BaseHandle type="target" position={Position.Left} className="" />
      </BaseNode>
    </motion.div>
  );
}
// const OutputNode: React.FC<Node<NodeProps<OutputNodeProps>> = ({ label, onReload }) => {

// };

// export default OutputNode;