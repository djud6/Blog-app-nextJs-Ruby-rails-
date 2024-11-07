import Link from "next/link"

export default function NavBar(){
    return (

    <nav>
        <Link href="/">
          Home 
        </Link>
        <Link href="/posts">
          Blog Posts
        </Link>
        <Link href="/posts/new">
          Create Post
        </Link>
      </nav>
    )
};