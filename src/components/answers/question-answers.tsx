import React from 'react';
// component import
import AnswerForm from './answer-form';
import AnswersList from './answers-list';
import AnswerModal from './answer-modal';
// mantine import
import { Button } from '@mantine/core';
// utils import
import { fetchAnswers } from '@/utils/supabase/answers/fetch';

const QuestionAnswers = async ({ questionId, userQuestion, userId }: { questionId: string; userQuestion: boolean; userId: string }) => {
  const answers = await fetchAnswers(questionId);

  // check if there is userId in answers.user_id
  const userAnswer = answers.find((answer) => answer.user_id === userId);

  return (
    <div>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>{answers.length} Answers</h1>
        {!userQuestion && !userAnswer ? <AnswerModal questionId={questionId} /> : ''}
      </div>
      <div className='mt-6'>
        <AnswersList answers={answers} />
      </div>
    </div>
  );
};

export default QuestionAnswers;
