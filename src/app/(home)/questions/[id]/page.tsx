import React, { Suspense } from 'react';
// component import
import QuestionDetail from '@/components/questions/question-detail';
import PopularQuestions from '@/components/home/popular-questions';
import PopularTopics from '@/components/topics/popular-topics';
import PopularSkeleton from '@/components/topics/popular-skeleton';
import QuestionDetailSkeleton from '@/components/questions/question-detail-skeleton';

const QuestionDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
      <div className='lg:col-span-2'>
        <Suspense fallback={<QuestionDetailSkeleton />}>
          <QuestionDetail questionId={params.id} />
        </Suspense>
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

export default QuestionDetailPage;
