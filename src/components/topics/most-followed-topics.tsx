import React from 'react';
// compoenent import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchMostFollowedTopics } from '@/utils/supabase/topics/fetch';

const MostFollowedTopics = async () => {
  const topics = await fetchMostFollowedTopics();

  return (
    <div className='mt-2'>
      <CategoryTitle>Most Followed Topics</CategoryTitle>
      <div className='mt-2'>
        {topics.length > 0 ? (
          <div className='grid grid-cols-1 gap-4'>
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

export default MostFollowedTopics;
