import { AnimatePresence, motion } from 'motion/react'
import { BaseNode } from './BaseNode';
import { NodeProps, Node, Position, useEdgesState, useNodesState, useReactFlow } from '@xyflow/react';
import { BaseHandle } from './BaseHandle';
import { DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Rocket } from 'lucide-react';
import { NodeHeader, NodeHeaderIcon, NodeHeaderTitle, NodeHeaderActions, NodeHeaderMenuAction, NodeHeaderDeleteAction } from '../node-header';
import { useEffect, useState } from 'react';
import { Document } from '@/renderer/types/workspaces';
import { DocumentOperation, HUMAN_READABLE_OPERATIONS_AND_KEYS, Operation, OPERATIONS } from '@/renderer/types/operations';

export default function OperationNode({ selected, data }: NodeProps<Node<{ operation: DocumentOperation, output: number }>>) {
  const { setNodes } = useReactFlow();

  const [operation, setOperation] = useState<Operation<any>>(OPERATIONS[data.operation] || OPERATIONS['nullish']);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === 'node-3') {
          // it's important that you create a new node object
          // in order to notify react flow about the change
          return {
            ...node,
            data: {
              ...node.data,
              operation: operation.operation,
            },
          };
        }
 
        return node;
      }),
    );
  }, [operation, setNodes])

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
      <BaseNode selected={selected} className="px-3 py-2 bg-dark-800">
      <div className="" id="tw-palette">
        <div className="bg-rose-500 size-0"></div>
        <div className="bg-sky-500 size-0"></div>
        <div className="bg-emerald-500 size-0"></div>
      </div>
        <NodeHeader className={`-mx-3 -mt-2 border-b border-neutral-700 ${operation.accent} rounded-t-md transition`}>
          <NodeHeaderIcon>
            <Rocket />
          </NodeHeaderIcon>
          <NodeHeaderTitle>
            <select
              className="bg-transparent text-white outline outline-white rounded-md border-r-8 border-transparent p-2"
              value={operation.operation}
              onChange={(e) => {
                const selectedOperation = OPERATIONS[e.target.value as DocumentOperation];
                console.log(selectedOperation);
                setOperation(selectedOperation);
              }}
            >
              {Object.keys(OPERATIONS).map((op) => (
                <option key={op} value={op} disabled={op === 'nullish'}>
                  {HUMAN_READABLE_OPERATIONS_AND_KEYS[op] || op === 'nullish' ? 'Unknown' : capitalize(op)}
                </option>
              ))}
            </select>
          </NodeHeaderTitle>
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
          <span className="text-xs text-neutral-500 max-w-[30ch] block">{operation?.description}</span>
          {/* <div className="text-sm text-neutral-500 uppercase font-semibold">Customize operation</div> */}
          <div className="mt-1 flex flex-col space-y-2">
            {/* add inputs based off of the operation selected for the params in its object */}
            <AnimatePresence>
              {Object.keys(operation.params).map((param) => {
                const paramConfig = (operation.params as any)[param];
                const isSelect = paramConfig.type === 'select';
                const isText = !paramConfig.type || paramConfig.type === 'text';
                return (
                <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} key={param} className="flex flex-col">
                  <label htmlFor={param} className="text-xs text-neutral-500 uppercase font-semibold">
                  {HUMAN_READABLE_OPERATIONS_AND_KEYS[param]}
                  </label>
                  {isSelect ? (
                    <select
                      id={param}
                      name={param}
                      value={paramConfig.default}
                      onChange={(e) => {
                        const newParams = { ...operation.params, [param]: { ...paramConfig, default: e.target.value } };
                        setOperation({ ...operation, params: newParams });
                      }}
                      className="bg-neutral-900/30 text-white outline-none px-2 py-1 rounded-md relative top-0"
                    >
                      {paramConfig.values.map((value: string) => (
                      <option key={value} value={value}>
                        {capitalize(value)}
                      </option>
                      ))}
                    </select>
                    ) : isText ? (
                    <textarea
                      id={param}
                      name={param}
                      value={paramConfig.default || ''}
                      placeholder={paramConfig.placeholder || ''}
                      onChange={(e) => {
                      const newParams = { ...operation.params, [param]: { ...paramConfig, default: e.target.value } };
                      setOperation({ ...operation, params: newParams });
                      }}
                      className="bg-neutral-900/30 text-white outline-none px-2 py-1 rounded-md"
                    />
                  ) : null}
                </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <BaseHandle type="source" position={Position.Right} className="" />
        <BaseHandle type="target" position={Position.Left} className="" />
      </BaseNode>
    </motion.div>
  )
}