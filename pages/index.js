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
      <h1>Hello!</h1>
      <p>
        Yo, they call me Ethan. I&sbquo;m a software engineer who likes to build
        simple yet elegant things. Here you&#39;ll find blog posts on random
        topics that I come across in my career.
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
