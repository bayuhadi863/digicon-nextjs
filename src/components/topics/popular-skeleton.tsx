import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const PopularSkeleton = () => {
  const skeletons = Array.from({ length: 3 });
  return (
    <div>
      <Skeleton
        height={30}
        width={180}
        radius='md'
        className='mb-4'
      />
      {skeletons.map((_, index) => (
        <Skeleton
          key={index}
          height={80}
          radius='md'
          className='mb-4'
        />
      ))}
    </div>
  );
};

export default PopularSkeleton;
