import React from 'react';
// mantine import
import { Card, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils import
import { getTopicFollowersCount } from '@/utils/supabase/topics/fetch';
// next js import
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TopicCard = async ({ topic, userId }: { topic: any; userId: any }) => {
  const topicFollowers = await getTopicFollowersCount(topic.id);
  const followersCount = topicFollowers.length;

  return (
    <Card
      withBorder
      radius='md'
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
            <span className='font-semibold'>200</span> Forums
          </p>
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
