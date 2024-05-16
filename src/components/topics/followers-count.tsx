'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const FollowersCount = () => {
  const [followers, setFollowers] = useState<any>([]);

  useEffect(() => {
    const supabase = createClient();

    const topicFollowers = supabase
      .channel('custom-all-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'topic_followers' }, (payload) => {
        console.log('Change received!', payload.new);
        setFollowers((prevFollowers: any) => [...prevFollowers, payload.new]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(topicFollowers);
    };
  }, []);

  return (
    <p>
      <span className='font-semibold'>{followers.length}</span> followers
    </p>
  );
};

export default FollowersCount;
