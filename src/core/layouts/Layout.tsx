import Head from "next/head"
import React, { FC } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { ThemeProvider } from "@primer/react"

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
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}

export default Layout
