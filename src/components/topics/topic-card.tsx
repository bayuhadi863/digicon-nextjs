'use client';

import React, { useState, useEffect } from 'react';
// mantine import
import { Card, Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils import
import { insertTopicFollower, checkIfTopicFollowed, getTopicFollowersCount } from '@/utils/supabase/topic';
// next js import
import Link from 'next/link';

const TopicCard = ({ topic, userId }: { topic: any; userId: any }) => {
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const checkIfFollowed = async () => {
      const followed = await checkIfTopicFollowed(topic.id, userId);

      if (followed.length > 0) {
        setFollowed(true);
      }
    };

    // get topic followers count
    const fetchTopicFollowersCount = async () => {
      const topicFollowers = await getTopicFollowersCount(topic.id);

      setFollowersCount(topicFollowers.length);
    };

    setFetchLoading(true);

    checkIfFollowed().then(() => {
      fetchTopicFollowersCount().then(() => {
        setFetchLoading(false);
      });
    });
  }, [topic.id, userId]);

  const handleFollow = async () => {
    try {
      setLoading(true);

      // insert topic followers
      await insertTopicFollower({
        topic_id: topic.id,
      });

      setLoading(false);

      setFollowed(true);

      setFollowersCount(followersCount + 1);

      notifications.show({
        title: 'Followed!',
        message: 'You are now following this topic',
        color: 'green',
      });
    } catch (error) {
      console.error(error);

      setLoading(false);

      notifications.show({
        title: 'Error!',
        message: 'An error occurred while following this topic',
        color: 'red',
      });
    }
  };

  return (
    <Card
      radius='md'
      withBorder
    >
      <div>
        <Link href={`/topics/${topic.id}`}>{topic.name}</Link>
      </div>
      <div className='flex justify-between items-center mt-2'>
        <div className='flex gap-2'>
          <Text
            size='xs'
            c='dimmed'
          >
            {followersCount} Followers
          </Text>
          <Text
            size='xs'
            c='dimmed'
          >
            200 Forums
          </Text>
        </div>
        <div>
          {fetchLoading ? (
            <p>Loading...</p>
          ) : followed ? (
            <Button
              size='xs'
              radius='md'
              variant='default'
              loading={loading}
              onClick={handleFollow}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              size='xs'
              radius='md'
              loading={loading}
              onClick={handleFollow}
            >
              Follow
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TopicCard;
