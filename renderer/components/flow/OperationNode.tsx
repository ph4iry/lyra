import { motion } from 'motion/react'
import { BaseNode } from './BaseNode';
import { NodeProps, Node, Position } from '@xyflow/react';
import { BaseHandle } from './BaseHandle';
import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Rocket } from 'lucide-react';
import { NodeHeader, NodeHeaderIcon, NodeHeaderTitle, NodeHeaderActions, NodeHeaderMenuAction, NodeHeaderDeleteAction } from '../node-header';
import { useState } from 'react';

type DocumentOperation = 'link' | 'question' | 'cite' | 'unknown'

export default function OperationNode({ selected, data }: NodeProps<Node<{ operation: DocumentOperation }>>) {
  const [selectedOption, setSelectedOption] = useState('mindmap');
  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode selected={selected} className="px-3 py-2 bg-dark-800 min-w-[15vw]">
        <NodeHeader className="-mx-3 -mt-2 border-b bg-indigo-800 rounded-t-md">
          <NodeHeaderIcon>
            <Rocket />
          </NodeHeaderIcon>
          <NodeHeaderTitle>{capitalize(data.operation)}</NodeHeaderTitle>
          <NodeHeaderActions>
            <NodeHeaderMenuAction label="Expand account options">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </NodeHeaderMenuAction>
            <NodeHeaderDeleteAction />
          </NodeHeaderActions>
        </NodeHeader>
        <div className="mt-2">
          <div className="text-xs text-neutral-500 uppercase font-semibold">Output as</div>
            <div className="mt-1 flex flex-col space-y-2">
            {['mindmap', 'paragraph'].map((option) => (
              <button
              key={option}
              onClick={() => setSelectedOption(option)}
              className={`p-3 block w-full rounded-md border-neutral-600 shadow-sm sm:text-sm ${
                selectedOption === option ? 'bg-neutral-800' : 'bg-transparent'
              }`}
              >
              {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
            </div>
        </div>
        <BaseHandle type="source" position={Position.Bottom} className="" />
        <BaseHandle type="target" position={Position.Top} className="" />
      </BaseNode>
    </motion.div>
  )
}