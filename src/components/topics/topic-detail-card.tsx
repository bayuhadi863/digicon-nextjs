import React from 'react';

// compoenent import
import PageTitle from '@/components/page-title';
import FollowersCount from './followers-count';
import FollowButton from './follow-button';
// utils import
import { fetchTopicById, getTopicFollowersCount, getRealtimeTopicFollowers, checkIfTopicFollowed } from '@/utils/supabase/topics/fetch';
import { getCurrentUser } from '@/utils/supabase/auth/fetch';

const TopicDetailCard = async ({ topicId }: { topicId: string }) => {
  const currentUser = await getCurrentUser();
  const topic = await fetchTopicById(topicId);
  const topicFollowers = await getTopicFollowersCount(topicId);
  const followersCount = topicFollowers.length;
  const followersByUser = await checkIfTopicFollowed(topicId, currentUser!.id);
  const followed = followersByUser.length > 0;

  const realtimeTopicFollowers = await getRealtimeTopicFollowers();

  // console.log(realtimeTopicFollowers.topic);

  return (
    <div>
      <div className='flex justify-between items-start gap-6'>
        <PageTitle>{topic.name}</PageTitle>
        <FollowButton
          topicId={topic.id}
          isFollowed={followed}
          userId={currentUser!.id}
        />
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
  );
};

export default TopicDetailCard;
