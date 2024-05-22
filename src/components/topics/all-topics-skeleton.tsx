import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const AllTopicsSkeleton = () => {
  const skeletons = Array.from({ length: 9 });
  return (
    <div>
      <Skeleton
        height={30}
        width={100}
        radius='md'
        className='mb-4'
      />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {skeletons.map((_, index) => (
          <Skeleton
            key={index}
            height={80}
            radius='md'
            className='mb-4'
          />
        ))}
      </div>
    </div>
  );
};

export default AllTopicsSkeleton;
