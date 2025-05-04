import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import Sidebar from '@/renderer/components/dom/Sidebar'
import { Background, BackgroundVariant, Controls, Panel, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import DocumentNode from '@/renderer/components/flow/DocumentNode'

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
  return (
    <React.Fragment>
      <Head>
        <title>Lyra Home</title>
      </Head>
      <main className={`${bricolage.variable} ${instrument.variable} font-sans h-screen bg-dark-800/15 dark:bg-dark-800-dark/15`}>
        <ReactFlowProvider>
          <div key='dom-ui' className="fixed w-screen h-screen z-10 top-0 left-0 pointer-events-none">
            <div className="h-10 flex justify-center items-center bg-dark-800 dark:bg-dark-800-dark border-b border-dark-300 dark:border-dark-300-dark">
              <div className="text-xl font-bold font-display">lyra</div>
            </div>
            <Sidebar />
          </div>
          <div key='react-flow-instance' className="fixed w-screen h-screen z-0 top-0 left-0 ">
            <ReactFlow defaultNodes={[
              {
                id: 'node-1',
                type: 'document',
                data: {
                  source: {
                  publisher: 'Vox',
                  title: 'Applying to College Today Is Incredibly Public and Incredibly Isolating',
                  author: 'Anna North',
                  id: 'applying-to-college-today-is-incredibly-public-and-incredibly-isolating' // slugified title
                  }
                },
                position: { x: 400, y: 250 }
              },
              {
                id: 'node-2',
                type: 'operation',
                data: {
                  operation: 'link'
                },
                position: { x: 400, y: 250 }
              }
            ]}  nodeTypes={{ 
              document: DocumentNode,
              operation: OperationNode,
            }}>
              <Background color="#52525270" variant={BackgroundVariant.Dots} size={3} gap={32} />
              {/* <Panel position="top-right" className="translate-y-14 dark:bg-dark-800-dark bg-dark-800 p-4">top-right</Panel> */}
              {/* <Controls /> */}
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </main>
    </React.Fragment>
  )
}
