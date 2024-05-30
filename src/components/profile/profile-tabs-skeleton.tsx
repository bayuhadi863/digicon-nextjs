import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const ProfileTabsSkeleton = () => {
  const skeletons = Array.from({ length: 4 });
  return (
    <div>
      <div className='flex gap-4 mb-2'>
        <Skeleton
          height='30'
          width='100'
          radius='md'
        />
        <Skeleton
          height='30'
          width='100'
          radius='md'
        />
        <Skeleton
          height='30'
          width='100'
          radius='md'
        />
      </div>
      <Skeleton
        height='3'
        radius='md'
      />
      <Skeleton
        height='40'
        width='200'
        radius='md'
        className='mt-4'
      />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4'>
        {skeletons.map((_, index) => (
          <Skeleton
            key={index}
            height={140}
            radius='md'
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileTabsSkeleton;
