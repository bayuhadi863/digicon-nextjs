import React, { Suspense } from 'react';
// compoenent import
import TopicDetailCard from '@/components/topics/topic-detail-card';
import TopicQuestionSearch from '@/components/topics/topic-questions-search';
import TopicQuestionsList from '@/components/topics/topic-questions-list';
import PopularQuestions from '@/components/home/popular-questions';
import PopularTopics from '@/components/topics/popular-topics';
import PopularSkeleton from '@/components/topics/popular-skeleton';
import QuestionListSkeleton from '@/components/questions/question-list-skeleton';
import TopicCardSkeleton from '@/components/topics/topic-card-skeleton';
// mantine import

// utils

const TopicDetailPage = ({ params, searchParams }: { params: { id: string }; searchParams: any }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-12'>
      <div className='lg:col-span-2'>
        <Suspense fallback={<TopicCardSkeleton />}>
          <TopicDetailCard topicId={params.id} />
        </Suspense>
        <div className='mt-8'>
          <h1 className='font-semibold text-2xl mb-4'>Questions</h1>
          <div className='mt-6'>
            <Suspense fallback={<QuestionListSkeleton />}>
              <TopicQuestionsList
                topicId={params.id}
                page={searchParams.page}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <div>
        <div className='mb-4'>
          <Suspense fallback={<PopularSkeleton />}>
            <PopularQuestions />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<PopularSkeleton />}>
            <PopularTopics titleLarge={false} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TopicDetailPage;
