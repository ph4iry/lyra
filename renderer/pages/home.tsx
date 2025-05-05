import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import Sidebar from '@/renderer/components/dom/Sidebar'
import { Background, BackgroundVariant, Controls, MarkerType, Panel, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import DocumentNode from '@/renderer/components/flow/DocumentNode';
import { PlaceholderNode } from '../components/flow/PlaceholderOperationNode'
import OutputNode from '../components/flow/OutputNode'

import '@xyflow/react/dist/style.css';
import OperationNode from '../components/flow/OperationNode'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-bricolage',
})

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-instrument',
})

export default function HomePage() {
  const nodeTypes = { 
    document: DocumentNode,
    operation: OperationNode,
    placeholder: PlaceholderNode,
    'output-document': OutputNode,
  }

  const defaultNodes = [
    {
      id: 'node-1',
      type: 'document',
      data: {
        source: {
        publisher: 'Vox',
        title: 'Applying to College Today Is Incredibly Public and Incredibly Isolating',
        author: 'Anna North',
        id: Date.now() // timestamp
        }
      },
      position: { x: 400, y: 250 }
    },
    {
      id: 'node-3',
      type: 'placeholder',
      data: {
        operation: 'link'
      },
      position: { x: 1000, y: 250 }
    },
    // {
    //   id: 'node-2',
    //   type: 'operation',
    //   data: {
    //     operation: 'link'
    //   },
    //   position: { x: 400, y: 250 }
    // }
  ];

  const defaultEdges = [
    {
      id: 'edge-1',
      source: 'node-1',
      target: 'node-3',
      animated: true,
      type: 'bezier',
      markerEnd: {
        type: MarkerType.ArrowClosed,
      },
    }
  ];

  return (
    <React.Fragment>
      <Head>
        <title>Lyra Home</title>
      </Head>
      <main className={`${bricolage.variable} ${instrument.variable} font-sans h-screen bg-dark-800/15 dark:bg-dark-800-dark/15`}>
        <div className="fixed w-screen z-50 top-0 h-10 flex justify-center items-center bg-dark-800 dark:bg-dark-800-dark border-b border-dark-300 dark:border-dark-300-dark">
          <div className="text-xl font-bold font-display">lyra</div>
        </div>
        <ReactFlowProvider>
          <div className="flex flex-nowrap w-screen h-screen">
            {/* <div key='dom-ui' className="fixed w-screen h-screen z-10 top-0 left-0">
            </div> */}
            <Sidebar />
            <div key='react-flow-instance' className="h-screen w-full">
              <ReactFlow {...{ nodeTypes, defaultNodes, defaultEdges }}>
                <Background color="#52525270" variant={BackgroundVariant.Dots} size={3} gap={32} />
                {/* <Panel position="top-right" className="translate-y-14 dark:bg-dark-800-dark bg-dark-800 p-4">top-right</Panel> */}
                {/* <Controls /> */}
              </ReactFlow>
            </div>
          </div>
        </ReactFlowProvider>
      </main>
    </React.Fragment>
  )
}
