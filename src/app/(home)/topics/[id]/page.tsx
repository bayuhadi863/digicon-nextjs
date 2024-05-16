import React, { Suspense } from 'react';
// compoenent import
import PageTitle from '@/components/page-title';
import TopicDetailCard from '@/components/topics/topic-detail-card';
// mantine import
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils

const TopicDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='min-h-screen grid grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <Suspense fallback={<p>Loading topic detail ...</p>}>
          <TopicDetailCard topicId={params.id} />
        </Suspense>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default TopicDetailPage;
