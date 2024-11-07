
// app/posts/[id]/page.tsx
import { notFound } from 'next/navigation';

type Post = {
  id: number;
  title: string;
  image: string | null;
  content: string;
  created_at: string;
};

export default async function Page({ params }: { params: { id: string } }) {
    const { id } = await params;
  try {
    const res = await fetch(`http://localhost:3001/api/posts/${id}`, {
       next: { revalidate: 3600 }, // revalidate every hour
    });

    if (!res.ok) {
      if (res.status === 404) {
        notFound();
      }
      throw new Error(`Failed to fetch post: ${res.status}`);
    }

    const post: Post = await res.json();

    return (
      <article className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        
        {post.image && (
          <div className="mb-4">
            <img 
              src = {`http://localhost:3001/${post.image}`}
              alt={post.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        )}
        
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error loading post:', error);
    throw error; 
  }
}