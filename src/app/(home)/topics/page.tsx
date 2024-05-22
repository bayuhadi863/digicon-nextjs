import React, { Suspense } from 'react';
// mantine import
import { Button } from '@mantine/core';
// component import
import PageTitle from '@/components/page-title';
import PopularTopics from '@/components/topics/popular-topics';
import MostFollowedTopics from '@/components/topics/most-followed-topics';
import AllTopics from '@/components/topics/all-topics';
import PopularSkeleton from '@/components/topics/popular-skeleton';
import AllTopicsSkeleton from '@/components/topics/all-topics-skeleton';
// utils import

const TopicPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className='min-h-screen'>
      <div className='flex justify-between items-center mb-6'>
        {/* <p>{currentUser.id}</p> */}
        <PageTitle>Topics</PageTitle>
        {/* <Button
          size='md'
          radius='md'
        >
          Request Topic
        </Button> */}
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6'>
        <Suspense fallback={<PopularSkeleton />}>
          <PopularTopics titleLarge={true} />
        </Suspense>
        <Suspense fallback={<PopularSkeleton />}>
          <MostFollowedTopics />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<AllTopicsSkeleton />}>
          <AllTopics page={searchParams.page} />
        </Suspense>
      </div>
    </div>
  );
};

export default TopicPage;
