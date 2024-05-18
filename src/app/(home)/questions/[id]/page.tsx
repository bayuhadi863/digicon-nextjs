import React, { Suspense } from 'react';
// component import
import QuestionDetail from '@/components/questions/question-detail';

const QuestionDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <Suspense fallback={<p>Loading question detail ...</p>}>
          <QuestionDetail questionId={params.id} />
        </Suspense>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default QuestionDetailPage;
