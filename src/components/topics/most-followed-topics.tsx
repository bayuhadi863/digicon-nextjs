'use client';

import React, { useState, useEffect } from 'react';
// compoenent import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchMostFollowedTopics } from '@/utils/supabase/topic';
import { getCurrentUser } from '@/utils/supabase/auth';

const MostFollowedTopics = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [topics, setTopics] = useState<any>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    const fetchMostFollowedTopicsData = async () => {
      const topics = await fetchMostFollowedTopics();
      setTopics(topics);
    };

    setFetchLoading(true);

    fetchCurrentUser().then(() => {
      fetchMostFollowedTopicsData().then(() => {
        setFetchLoading(false);
      });
    });
  }, []);

  return (
    <div className='mt-2'>
      <CategoryTitle>Most Followed Topics</CategoryTitle>
      <div className='mt-2'>
        {fetchLoading ? (
          <div>Loading...</div>
        ) : topics.length > 0 ? (
          <div className='grid grid-cols-1 gap-4'>
            {topics.map((topic: any) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                userId={currentUser ? currentUser.id : null}
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
