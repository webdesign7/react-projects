import Link from "next/link";

export default function BlogPage () {
  return <main>
      <h1> Blog Page </h1>
      <p>This is the blog page</p>
      <ul>
          <li>
              <Link href="/blog/post-1">Post 1</Link>
          </li>
          <li>
              <Link href="/blog/post-2">Post 2</Link>
          </li>
      </ul>
  </main>
}