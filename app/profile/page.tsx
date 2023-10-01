'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { PostType } from '@/types/post';
import { toast } from 'react-toastify';

export default function MyPropfile() {
  const { data: session }: any = useSession();
  const [posts, setPosts] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      if (session?.user) {
        await axios
          .get(`/api/users/${session?.user?.id}/posts`)
          .then((res) => setPosts(res.data));
      }
    };

    fetchPosts();
  }, [session?.user]);

  const handleEdit = async (post: PostType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PostType) => {
    const hasConfirmed = confirm('Are you sure you want to delete this post?');

    if (hasConfirmed) {
      try {
        await axios({
          method: 'DELETE',
          url: `/api/prompt/${post._id.toString()}`,
        });

        const filteredPosts = posts.filter((p: PostType) => p._id !== post._id);

        toast.success('Delete successfully');

        setPosts(filteredPosts);
      } catch (error) {
        toast.error('Failed delete to prompt');
        console.log(error);
      }
    }
  };

  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page'
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
