import React from 'react';
// component import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
import MyPagination from '../home/home-pagination';
// utils import
import { fetchTopics } from '@/utils/supabase/topics/fetch';

const AllTopics = async ({ page }: { page: any }) => {
  const pageNumber = page ? parseInt(page) : 1;

  const allTopics = await fetchTopics();
  const limitedTopics = await fetchTopics(pageNumber);

  // function to round up float number
  const roundUp = (num: number, precision: number) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };

  return (
    <div>
      <CategoryTitle>All Topics</CategoryTitle>
      <div className='mt-2'>
        {limitedTopics.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {limitedTopics.map((topic: any) => (
              <TopicCard
                key={topic.id}
                topic={topic}
              />
            ))}
          </div>
        ) : (
          <div>No topics found</div>
        )}
        <div className='mt-6 flex justify-center'>
          <MyPagination
            length={roundUp(allTopics.length / 9, 0)}
            pageNumber={pageNumber}
            url='/topics'
          />
        </div>
      </div>
    </div>
  );
};

export default AllTopics;
