'use client';

import React, { useState } from 'react';

import { insertTopicFollower, deleteTopicFollower } from '@/utils/supabase/topics/actions';

import { notifications } from '@mantine/notifications';
import { Button } from '@mantine/core';

const FollowButton = ({ topicId, isFollowed, userId }: { topicId: string; isFollowed: boolean; userId: string }) => {
  const [followLoading, setFollowLoading] = useState(false);
  const [followed, setFollowed] = useState(isFollowed);

  const handleFollow = async () => {
    try {
      setFollowLoading(true);

      // insert topic followers
      await insertTopicFollower({
        topic_id: topicId,
      });

      setFollowLoading(false);

      setFollowed(true);

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

  const handleUnfollow = async () => {
    try {
      setFollowLoading(true);

      // delete topic followers
      await deleteTopicFollower(topicId, userId);

      setFollowLoading(false);

      setFollowed(false);

      notifications.show({
        title: 'Unfollowed!',
        message: 'You have unfollowed this topic',
        color: 'green',
      });
    } catch (error) {
      console.error(error);

      setFollowLoading(false);

      notifications.show({
        title: 'Error!',
        message: 'An error occurred while unfollowing this topic',
        color: 'red',
      });
    }
  };

  return (
    <div>
      {followed ? (
        <Button
          variant='default'
          loading={followLoading}
          onClick={handleUnfollow}
          color='gray'
          radius="md"
        >
          Unfollow
        </Button>
      ) : (
        <Button
          loading={followLoading}
          onClick={handleFollow}
          radius="md"
        >
          Follow
        </Button>
      )}
    </div>
  );
};

export default FollowButton;
