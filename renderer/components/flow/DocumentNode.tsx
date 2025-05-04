import { motion } from 'motion/react'
import { BaseNode } from './BaseNode';
import { NodeProps, Node, Position } from '@xyflow/react';
import { BaseHandle } from './BaseHandle';

interface Source {
  publisher: string,
  title: string,
  author: string,
  id: string
}

export default function DocumentNode({ data }: NodeProps<Node<{ source: Source }>>) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode className="p-6 max-w-md w-screen dark:bg-dark-800">
        <div>
          <div className="text-sm text-neutral-500 uppercase font-semibold">{data.source.publisher}</div>
          <div className="text-base font-semibold">"{data.source.title}"</div>
          <div className="text-sm text-white">{data.source.author}</div>
          <BaseHandle type="source" position={Position.Bottom} className="" />
        </div>
      </BaseNode>
    </motion.div>
  )
}