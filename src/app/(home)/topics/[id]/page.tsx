import React, { Suspense } from 'react';
// compoenent import
import TopicDetailCard from '@/components/topics/topic-detail-card';
import TopicQuestionSearch from '@/components/topics/topic-questions-search';
import TopicQuestionsList from '@/components/topics/topic-questions-list';
// mantine import

// utils

const TopicDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='min-h-screen grid grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <Suspense fallback={<p>Loading topic detail ...</p>}>
          <TopicDetailCard topicId={params.id} />
        </Suspense>
        <div className='mt-8'>
          <h1 className='font-semibold text-2xl mb-4'>Questions</h1>
          <TopicQuestionSearch />
          <div className='mt-6'>
            <TopicQuestionsList topicId={params.id} />
          </div>
        </div>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default TopicDetailPage;
