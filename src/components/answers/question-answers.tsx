import React, { Suspense } from 'react';
// component import
import AnswerForm from './answer-form';
import AnswersList from './answers-list';
import AnswerModal from './answer-modal';
// mantine import
import { Button } from '@mantine/core';

const QuestionAnswers = ({ questionId, userQuestion }: { questionId: string; userQuestion: boolean }) => {
  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>0 Answers</h1>
        {!userQuestion && <AnswerModal questionId={questionId} />}
      </div>
      <div className='mt-6'>
        <Suspense fallback={<p>Answers loading ...</p>}>
          <AnswersList questionId={questionId} />
        </Suspense>
      </div>
    </div>
  );
};

export default QuestionAnswers;
