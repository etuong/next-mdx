import fs from "fs";
import matter from "gray-matter";
import Link from "next/link";
import React from "react";

export async function getStaticProps() {
  const files = fs.readdirSync("posts");

  const posts = files.map((fileName) => {
    const slug = fileName.split(".")[0];
    const readFile = fs.readFileSync(`posts/${fileName}`, "utf-8");
    const { data: frontMatter } = matter(readFile);
    return {
      slug,
      frontMatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}

const Home = ({ posts }) => {
  return (
    <React.Fragment>
      <h1>Hello, Ethan!</h1>
      <p>
        Hey, I'm a Senior Software Engineer at Company. I enjoy working with
        Next.js and crafting beautiful front-end experiences. This portfolio is
        built with Next.js and a library called Nextra. It allows you to write
        Markdown and focus on the content of your portfolio. Deploy your own in
        a few minutes.
      </p>
      {posts.map(({ slug, frontMatter }) => (
        <div key={slug} className="post-item">
          <h3 className="post-item-title">
            <Link href={`/post/${slug}`}>
              <a className="post-item-title">{frontMatter.title}</a>
            </Link>
          </h3>
          <p className="post-item-desc">
            {frontMatter.metaDesc.substring(0, 130)}...
          </p>
          <p className="post-item-date">{frontMatter.date}</p>
        </div>
      ))}
    </React.Fragment>
  );
};

export default Home;
