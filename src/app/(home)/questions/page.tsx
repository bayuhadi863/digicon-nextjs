import React, { Suspense } from 'react';
// component import
import SearchInput from '@/components/home/search-input';
import AllQuestionsList from '@/components/questions/all-questions-list';
import PopularQuestions from '@/components/home/popular-questions';
import PopularTopics from '@/components/topics/popular-topics';

const QuestionPage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-12'>
      <div className='lg:col-span-2'>
        <div>
          <SearchInput />
        </div>
        <h1 className='font-semibold text-2xl mt-6 mb-4'>All Questions</h1>
        <Suspense fallback={<p>Loading...</p>}>
          <AllQuestionsList
            page={searchParams.page}
            query={searchParams.query}
          />
        </Suspense>
      </div>
      <div>
        <div className='mb-4'>
          <Suspense fallback={<p>Loading...</p>}>
            <PopularQuestions />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<p>Loading...</p>}>
            <PopularTopics titleLarge={false} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
