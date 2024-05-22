import React, { Suspense } from 'react';
// component import
import QuestionDetail from '@/components/questions/question-detail';
import PopularQuestions from '@/components/home/popular-questions';
import PopularTopics from '@/components/topics/popular-topics';

const QuestionDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
      <div className='lg:col-span-2'>
        <Suspense fallback={<p>Loading question detail ...</p>}>
          <QuestionDetail questionId={params.id} />
        </Suspense>
      </div>
      <div>
        <div className='mb-4'>
          <PopularQuestions />
        </div>
        <div>
          <PopularTopics titleLarge={false} />
        </div>
      </div>
    </div>
  );
};

export default QuestionDetailPage;
