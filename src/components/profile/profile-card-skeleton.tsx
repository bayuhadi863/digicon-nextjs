import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const ProfileCardSkeleton = () => {
  return (
    <div className='flex flex-col md:flex-row gap-6 justify-between'>
      <div className='flex flex-col md:flex-row items-center gap-6'>
        <Skeleton
          height={110}
          circle
          // mb='xl'
        />
        <div className='flex flex-col items-center md:items-start '>
          {/* <h3 className='text-2xl font-semibold lg:text-3xl mb-2 break-all whitespace-normal'>{profile.name}</h3> */}

          <Skeleton
            height={40}
            width={300}
            radius='md'
            className='mb-4'
          />
          <Skeleton
            height={20}
            width={150}
            radius='md'
            className='mb-4'
          />
        </div>
      </div>
      <div className='flex gap-2 justify-center'>
        <Skeleton
          height={35}
          radius='md'
          width={100}
        />
        <Skeleton
          height={35}
          radius='md'
          width={100}
        />
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
