
'use client'

import Profile from '@/components/Profile'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function UserProfile({params}: any) {
    
    const userName = useSearchParams().get('name');
    
    const [userPosts, setUserPosts] = useState([])

    useEffect(() => {
      const fetchPosts = async () => {
        await axios.get(`/api/users/${params?.id}/posts`).then((res) => setUserPosts(res.data));
      };
      
      if(params?.id) fetchPosts();
    }, [params.id]);
  
  return (
    <Profile
        name={`${userName}`}
        desc={`Chào mừng bạn đến với trang cá nhân của ${userName}`}
        data={userPosts}
    />
  )
}
