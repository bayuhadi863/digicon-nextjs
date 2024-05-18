import React from 'react';
// component import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchTopics } from '@/utils/supabase/topics/fetch';

const AllTopics = async () => {
  const topics = await fetchTopics();

  return (
    <div>
      <CategoryTitle>All Topics</CategoryTitle>
      <div className='mt-2'>
        {topics.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {topics.map((topic: any) => (
              <TopicCard
                key={topic.id}
                topic={topic}
              />
            ))}
          </div>
        ) : (
          <div>No topics found</div>
        )}
      </div>
    </div>
  );
};

export default AllTopics;
