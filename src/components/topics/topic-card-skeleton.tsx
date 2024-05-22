import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const TopicCardSkeleton = () => {
  return (
    <div>
      <div className='flex flex-col lg:flex-row lg:justify-between items-start gap-4 lg:gap-6 '>
        <Skeleton
          height={35}
          radius='md'
          className='lg:flex-grow'
        />
        <Skeleton
          height={35}
          width={120}
          radius='md'
        />
      </div>
      <div className='flex gap-8 mt-6'>
        <Skeleton
          height={20}
          width={150}
          radius='md'
        />
        <Skeleton
          height={20}
          width={150}
          radius='md'
        />
      </div>
    </div>
  );
};

export default TopicCardSkeleton;
