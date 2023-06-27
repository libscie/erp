import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import NavHeader from "../components/NavHeader"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "erp"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavHeader />
      {children}
    </>
  )
}

export default Layout
