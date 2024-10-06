import { readFileSync } from "fs";
import { GetServerSidePropsContext } from "next";

type Post = {
    title: string;
    content: string;
}

export default function PostPage(props: { post: Post }) {
  return (
    <main>
      <h1 className="text-xl">{props.post.title}</h1>
      <p>{props.post.content}</p>
    </main>
  );
}

export function getServerSideProps(context: GetServerSidePropsContext) {
    const { slug } = context.query as { slug: string[] };
    const postFileName = slug.join("/").replace("%20", " ");

    const postFile = readFileSync(`posts/${postFileName}`);

    const postTitleSplit = slug[slug.length - 1].replace("%20", " ").split(".");
    const postTitle = postTitleSplit.slice(0, postTitleSplit.length - 1).join(".");

    return {
        props: {
            post: {
                title: postTitle,
                content: postFile.toString()
            }
        }
    };
}