'use client';

import React, { useState, useEffect } from 'react';
// mantine import
import { Button } from '@mantine/core';
// component import
import PageTitle from '@/components/page-title';
import PopularTopics from '@/components/topics/popular-topics';
import MostFollowedTopics from '@/components/topics/most-followed-topics';
import AllTopics from '@/components/topics/all-topics';
// utils import
import { getCurrentUser } from '@/utils/supabase/auth';

const TopicPage = () => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        {/* <p>{currentUser.id}</p> */}
        <PageTitle>Topics</PageTitle>
        <Button
          size='md'
          radius='md'
        >
          Request Topic
        </Button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6'>
        <PopularTopics />
        <MostFollowedTopics />
      </div>
      <div>
        <AllTopics />
      </div>
    </div>
  );
};

export default TopicPage;
