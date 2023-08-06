import Link from "next/link";
import React from "react";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <Head>
        <title>Ethan&apos;s Randomness</title>
      </Head>
      <article className="prose prose-sm md:prose">
        <div className="nav-line">
          <Link href="/">
            <a className="nav-link">Home</a>
          </Link>
          <Link href="/about">
            <a className="nav-link">About</a>
          </Link>
        </div>

        <main className="mx-auto flex-1">{children}</main>

        <footer>
          <div className="mx-auto flex justify-end">&copy; 2023 Ethan Uong</div>
        </footer>
      </article>
    </React.Fragment>
  );
}
