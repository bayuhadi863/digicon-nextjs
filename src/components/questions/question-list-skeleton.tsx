import React from 'react';
// mantine import
import { Skeleton } from '@mantine/core';

const QuestionListSkeleton = () => {
  const skeletons = Array.from({ length: 5 });

  return (
    <div>
      {skeletons.map((_, index) => (
        <Skeleton
          key={index}
          height={120}
          radius='md'
          className='mb-4'
        />
      ))}
    </div>
  );
};

export default QuestionListSkeleton;
