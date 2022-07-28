import Link from "next/link";
import React from "react";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>Ethan</title>
      </Head>
      <article className="container prose prose-sm md:prose">
        <div className="nav-line">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
        </div>
        
        <main className="container mx-auto flex-1">{children}</main>

        <footer>
          <div className="container mx-auto flex justify-center">
            &copy; 2022 DailyDevTips
          </div>
        </footer>
      </article>
    </React.Fragment>
  );
}
