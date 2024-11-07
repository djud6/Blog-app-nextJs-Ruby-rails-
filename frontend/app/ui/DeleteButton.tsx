"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type DeleteButtonProps = {
  postId: number;
};

export default function DeleteButton({ postId }: DeleteButtonProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setDeleting(true);

    try {
      const res = await fetch(`http://localhost:3001/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Refresh the page data
        router.refresh();
      } else {
        console.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete} 
      disabled={deleting}
      className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 disabled:bg-red-300"
    >
      {deleting ? 'Deleting...' : 'Delete'}
    </button>
  );
}