import fs from "fs";
import matter from "gray-matter";
import md from "markdown-it";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import SyntaxHighlighter from "react-syntax-highlighter";

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((file) => ({
    params: {
      slug: file.split(".")[0],
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const source  = fs.readFileSync(`posts/${slug}.mdx`, "utf-8");
  const { data: frontmatter, content } = matter(source );
  const mdxSource = await serialize(content);
  return {
    props: {
      frontmatter,
      content,
      mdxSource
    },
  };
}

export default function PostPage({ frontmatter, content, mdxSource }) {
  return (
    <div className="prose mx-auto">
      <h1>{frontmatter.title}</h1>
      <MDXRemote {...mdxSource} components={{ SyntaxHighlighter }} />
      {/* <div dangerouslySetInnerHTML={{ __html: md().render(content) }} /> */}
    </div>
  );
}
