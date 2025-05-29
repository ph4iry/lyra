import React from 'react'
import Head from 'next/head'
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif } from 'next/font/google'
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
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  style: 'italic',
  weight: ['400'],
  variable: '--font-instrument-serif',
});

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Lyra</title>
      </Head>
      <main className={`${bricolage.variable} ${instrument.variable} ${instrumentSerif.variable} font-sans h-screen bg-dark-800/15 dark:bg-dark-800-dark/15`}>
        <div id="toolbar" className="fixed w-screen z-50 top-0 h-10 flex justify-center items-center bg-neutral-900">
          <div className="text-xl font-display">lyra</div>
        </div>
        <div className="flex flex-nowrap w-screen h-screen">
          <ReactFlowProvider>
              <WorkspaceProvider>
                <div key='dom-ui'>
                  <Sidebar />
                  <NewDocument />
                </div>
                <Flow />
              </WorkspaceProvider>
          </ReactFlowProvider>
        </div>
      </main>
    </React.Fragment>
  )
}
