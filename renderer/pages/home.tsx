import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <React.Fragment>
      <Head>
        <title>Home - Nextron (with-tailwindcss)</title>
      </Head>
      <body>
        <div className="grid grid-col-1 text-2xl w-full text-center">
          
        </div>
        <div className="mt-1 w-full flex-wrap flex justify-center">
          <Link href="/next">Go to next page</Link>
        </div>
      </body>
    </React.Fragment>
  )
}
