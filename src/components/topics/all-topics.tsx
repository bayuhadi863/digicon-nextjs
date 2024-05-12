'use client';

import React, { useState, useEffect } from 'react';
// component import
import CategoryTitle from './category-title';
import TopicCard from './topic-card';
// utils import
import { fetchTopics } from '@/utils/supabase/topic';
import { getCurrentUser } from '@/utils/supabase/auth';

const AllTopics = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [topics, setTopics] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetch current user
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    // fetch all topics
    const fetchAllTopics = async () => {
      const topics = await fetchTopics();
      setTopics(topics);
    };

    setLoading(true);

    fetchCurrentUser().then(() => {
      fetchAllTopics().then(() => {
        setLoading(false);
      });
    });
  }, []);

  return (
    <div>
      <CategoryTitle>All Topics</CategoryTitle>
      <div className='mt-2'>
        {loading ? (
          <div>Loading...</div>
        ) : topics.length > 0 ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
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

export default AllTopics;
