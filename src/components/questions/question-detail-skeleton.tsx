import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const QuestionDetailSkeleton = () => {
  const skeletons = Array.from({ length: 3 });
  return (
    <div>
      <Skeleton
        height={25}
        radius='md'
        className='mb-3'
      />
      <Skeleton
        height={25}
        radius='md'
        className='mb-6'
      />
      <Skeleton
        height={20}
        width={150}
        radius='md'
        className='mb-4'
      />
      <div className='mb-6 flex justify-between flex-wrap gap-4 items-center'>
        <Skeleton
          height={23}
          radius='md'
          width={250}
        />
        <Skeleton
          height={10}
          radius='md'
          width={80}
        />
      </div>
      <Skeleton
        height={270}
        radius='md'
        className='mb-6'
      />
      {skeletons.map((_, index) => (
        <Skeleton
          key={index}
          height={12}
          radius='md'
          className='mb-2'
        />
      ))}
      <Skeleton
        height={12}
        width='70%'
        radius='md'
        className='mb-2'
      />
    </div>
  );
};

export default QuestionDetailSkeleton;
