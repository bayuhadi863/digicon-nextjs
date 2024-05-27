import React from 'react';
// mantine import
import { Card, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils import
import { getTopicFollowersCount } from '@/utils/supabase/topics/fetch';
import { fetchTopicQuestionsCountById } from '@/utils/supabase/topics/fetch';
// next js import
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TopicCard = async ({ topic }: { topic: any }) => {
  const topicFollowers = await getTopicFollowersCount(topic.id);
  const followersCount = topicFollowers.length;
  const topicWithQuestionsCount = await fetchTopicQuestionsCountById(topic.id);

  return (
    <Card
      withBorder
      radius='md'
      shadow='sm'
      component={Link}
      href={`/topics/${topic.id}`}
    >
      <div>
        <h3 className='font-semibold'>{topic.name}</h3>
      </div>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex gap-2'>
          <p className='text-xs'>
            <span className='font-semibold'>{followersCount}</span> Followers
          </p>
          <p className='text-xs'>
            <span className='font-semibold'>{topicWithQuestionsCount.questions_count}</span> Questions
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
