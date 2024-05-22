import React from 'react';
// mantine import
import { Text } from '@mantine/core';
//component import
import TopicCard from '../topics/topic-card';
// utils import
import { fetchTopicsByFollowerId } from '@/utils/supabase/topics/fetch';

const FollowedTopicsList = async ({ userId }: { userId: string }) => {
  const topics = await fetchTopicsByFollowerId(userId);

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>My Followed Topics ({topics.length})</h3>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {topics.length > 0 ? (
          topics.map((topic: any) => (
            <TopicCard
              key={topic.id}
              topic={topic}
            />
          ))
        ) : (
          <Text
            size='sm'
            c='dimmed'
          >
            No topics found
          </Text>
        )}
      </div>
    </div>
  );
};

export default FollowedTopicsList;
