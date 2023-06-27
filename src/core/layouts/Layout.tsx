import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import NavHeader from "../components/NavHeader"
import { Toaster } from "react-hot-toast"

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
      <Toaster position="bottom-right" />
    </>
  )
}

export default Layout
