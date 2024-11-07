"use client";

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

interface FormData {
  title: string;
  content: string;
}

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!params?.id) {
        setError("Post ID is required");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3001/api/posts/${params.id}`);
        setFormData({
          title: response.data.title,
          content: response.data.content
        });
      } catch (err) {
        setError("Failed to fetch post. Please try again.");
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params?.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!params?.id) {
      setError("Post ID is required for update");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await axios.put(
        `http://localhost:3001/api/posts/${params.id}`,
        formData
      );
      router.push('/');
    } catch (err) {
      console.error("Failed to update post:", err);
      setError("Failed to update post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!params?.id || !window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await axios.delete(`http://localhost:3001/api/posts/${params.id}`);
      router.push('/');
    } catch (err) {
      console.error("Failed to delete post:", err);
      setError("Failed to delete post. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Edit Post</h1>
      
      {error && (
        <div style={styles.error}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleUpdate} style={styles.form}>
        <div style={styles.inputGroup}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post title"
            disabled={submitting}
            required
            style={styles.input}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Post content"
            disabled={submitting}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.buttonGroup}>
          <button
            type="submit"
            disabled={submitting}
            style={styles.updateButton}
          >
            {submitting ? 'Updating...' : 'Update Post'}
          </button>
          
          <button
            type="button"
            onClick={handleDelete}
            disabled={submitting}
            style={styles.deleteButton}
          >
            {submitting ? 'Deleting...' : 'Delete Post'}
          </button>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '200px',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
  },
  updateButton: {
    padding: '8px 16px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    flex: 1,
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#dc2626',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  error: {
    padding: '12px',
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    borderRadius: '4px',
    marginBottom: '20px',
  },
} as const;