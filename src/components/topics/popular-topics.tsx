import React from 'react';
// component import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchTopicQuestionsCount } from '@/utils/supabase/topics/fetch';

const PopularTopics = async () => {
  const topics = await fetchTopicQuestionsCount();

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

export default PopularTopics;
