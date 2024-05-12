'use client';

import React, { useState, useEffect } from 'react';
// compoenent import
import PageTitle from '@/components/page-title';
// mantine import
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils
import { fetchTopicById, insertTopicFollower, checkIfTopicFollowed, getTopicFollowersCount } from '@/utils/supabase/topic';
import { getCurrentUser } from '@/utils/supabase/auth';

const TopicDetailPage = ({ params }: { params: { id: string } }) => {
  const [topic, setTopic] = useState<any>(null);
  const [followed, setFollowed] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    const fetchTopic = async () => {
      const topic = await fetchTopicById(params.id);
      setTopic(topic);
    };

    const checkIfFollowed = async () => {
      if (currentUser) {
        const followed = await checkIfTopicFollowed(params.id, currentUser.id);

        if (followed.length > 0) {
          setFollowed(true);
        }
      }
    };

    const fetchTopicFollowersCount = async () => {
      const topicFollowers = await getTopicFollowersCount(params.id);

      setFollowersCount(topicFollowers.length);
    };

    // loading start
    setLoading(true);

    fetchCurrentUser().then(() => {
      fetchTopic().then(() => {
        checkIfFollowed().then(() => {
          fetchTopicFollowersCount().then(() => {
            // loading end
            setLoading(false);
          });
        });
      });
    });
  }, [currentUser, currentUser?.id, params.id]);

  const handleFollow = async () => {
    try {
      setFollowLoading(true);

      // insert topic followers
      await insertTopicFollower({
        topic_id: topic.id,
      });

      setFollowLoading(false);

      setFollowed(true);

      setFollowersCount(followersCount + 1);

      notifications.show({
        title: 'Followed!',
        message: 'You are now following this topic',
        color: 'green',
      });
    } catch (error) {
      console.error(error);

      setFollowLoading(false);

      notifications.show({
        title: 'Error!',
        message: 'An error occurred while following this topic',
        color: 'red',
      });
    }
  };

  return (
    <div className='min-h-screen grid grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <div className='flex justify-between items-start gap-6'>
          <PageTitle>{topic?.name}</PageTitle>
          <div>
            {followed ? (
              <Button
                variant='default'
                loading={followLoading}
                onClick={handleFollow}
                color='gray'
              >
                Unfollow
              </Button>
            ) : (
              <Button
                loading={followLoading}
                onClick={handleFollow}
              >
                Follow
              </Button>
            )}
          </div>
        </div>
        <div className='flex gap-8 mt-4'>
          <p>
            <span className='font-semibold'>{followersCount}</span> followers
          </p>
          <p>
            <span className='font-semibold'>200</span> questions
          </p>
        </div>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default TopicDetailPage;
