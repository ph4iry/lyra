import React from 'react';
import { BaseNode } from './BaseNode';
import { RefreshCw } from 'lucide-react';
import { Node, NodeProps, Position } from '@xyflow/react';
import { motion } from 'motion/react';
import { BaseHandle } from './BaseHandle';
// import { Source } from './DocumentNode';
interface OutputNodeProps {
  label: string;
  onReload: () => void;
}

// { selected, data }: NodeProps<Node<{ operation: DocumentOperation, output: number }>>

export default function OutputNode({ selected, data }: NodeProps<Node<{ label: string }>>) {
  const { label } = data;
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode selected={selected} className="p-5 bg-dark-800 min-w-[15vw] max-w-[40vw]">
        <div className="flex flex-nowrap gap-5">
          <span className="uppercase font-semibold text-neutral-700">{label}</span>
          <button className="">
            <RefreshCw size={16} />
          </button>
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