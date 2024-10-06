import { PostSummary } from "@/lib/types";
import { readdirSync } from "fs";
import Link from "next/link";

export default function Home(props: { posts: PostSummary[] }) {
  return (
    <main>
      <h1 className="text-xl">Posts</h1>
      <ul>
        {props.posts.map(({ url, title }) => (
          <li key={url} className=" hover:underline">
            <Link href={url}>
              {title}
            </Link> 
          </li>
        ))}
      </ul>
    </main>
  );
}

export function getServerSideProps() {
  const postFiles = readdirSync("posts", { recursive: true, withFileTypes: true });

  return {
    props: {
      posts: postFiles.filter((file) => !file.isDirectory()).map((file) => ({...new PostSummary(file)})),
    },
  };
}