'use client';

import { PostType } from '@/types/post';
import { UserType } from '@/types/user';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

interface Props {
  item: UserType;
}

export default function AccounItem({ item }: Props) {
  const { data: session }: any = useSession();
  const router = useRouter();

  const handleLink = () => {
    router.push(
      session?.user.id === item._id
        ? '/profile'
        : `/profile/${item._id}?name=${item.username}`
    );
  };
  return (
    <div
      className='flex items-center pt-2 pb-2 pl-4 pr-4 cursor-pointer hover:bg-gray-200'
      onClick={handleLink}
    >
      <Image
        src={`${item.image}`}
        alt='IMG'
        className='rounded-[50%] object-cover'
        width={40}
        height={40}
      />
      <div className='flex-1 ml-3'>
        <h4 className='text-[1.4rem] font-semibold'>
          <span className='ml-[6px] text-[rgb(86,165,165)] text-[1.2rem]'>
            {item.email}
          </span>
        </h4>
        <span className='font-[1.4rem] ml-[6px] text-[rgba(22,24,35,0.5)]'>
          {item.username}
        </span>
      </div>
    </div>
  );
}
