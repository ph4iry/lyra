import { motion } from 'motion/react'
import { BaseNode } from './BaseNode';
import { NodeProps, Node, Position } from '@xyflow/react';
import { BaseHandle } from './BaseHandle';
import { ArticleData } from '@extractus/article-extractor';
import { MoreHorizontal } from 'lucide-react';

export default function DocumentNode({ data }: NodeProps<Node<{ source: Partial<ArticleData> }>>) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode className="p-6 max-w-sm w-screen dark:bg-dark-800 relative">
        <button className="absolute top-6 right-6 bg-neutral-900 p-1 rounded-full">
          <MoreHorizontal className="size-6 text-white" />
        </button>
        <div>
          <div className="text-sm text-neutral-500 uppercase font-semibold">{data.source.source}</div>
          <div className="text-base font-semibold">"{data.source.title}"</div>
          <div className="text-sm text-white">{data.source.author}</div>
          <BaseHandle type="source" position={Position.Bottom} className="" />
        </div>
      </BaseNode>
    </motion.div>
  )
}