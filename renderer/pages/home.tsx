import React from 'react'
import Head from 'next/head'
import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google'
import Sidebar from '../components/dom/Sidebar'
import { ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Flow from '../components/flow/Flow';

import WorkspaceProvider from '../components/dom/WorkspaceProvider'
import NewDocument from '../components/dom/documents/NewDocument'

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
        <div className="fixed w-screen z-50 top-0 h-10 flex justify-center items-center bg-dark-800 dark:bg-dark-800-dark border-b border-dark-300 dark:border-dark-300-dark">
          <div className="text-xl font-bold font-display">lyra</div>
        </div>
        <ReactFlowProvider>
          <div className="flex flex-nowrap w-screen h-screen">
            <WorkspaceProvider>
              <div key='dom-ui'>
                <Sidebar />
                <NewDocument />
              </div>
              <Flow />
            </WorkspaceProvider>
          </div>
        </ReactFlowProvider>
      </main>
    </React.Fragment>
  )
}
