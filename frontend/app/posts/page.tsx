// Page.tsx
import Link from 'next/link';
import DeleteButton from '../ui/DeleteButton';

type Post = {
  id: number;
  title: string;
  image: string | null;
  content: string;
};


export default async function Page() {
  const res = await fetch('http://localhost:3001/api/posts', {
    cache: 'no-store'
  });
  const posts: Post[] = await res.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="border p-4 rounded-lg">
            <Link href={`/posts/${post.id}`} className="block mb-2">
              <h2 className="text-xl font-semibold hover:text-blue-600">{post.title}</h2>
            </Link>
            <div className="flex gap-2">
              <Link href={`/posts/edit/${post.id}`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
              </Link>
              <DeleteButton postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}