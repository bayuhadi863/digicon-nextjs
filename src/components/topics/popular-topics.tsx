import React from 'react';
// component import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchTopicQuestionsCount } from '@/utils/supabase/topics/fetch';

const PopularTopics = async ({ titleLarge }: { titleLarge: boolean }) => {
  const topics = await fetchTopicQuestionsCount();

  return (
    <div className='mt-2'>
      {titleLarge ? <CategoryTitle>Popular Topics</CategoryTitle> : <h4 className='font-semibold text-xl'>Popular Topics</h4>}

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
