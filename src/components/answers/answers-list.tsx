import React from 'react';
// utils import
import { fetchAnswers } from '@/utils/supabase/answers/fetch';
// component import
import AnswerCard from './answer-card';

const AnswersList = async ({ questionId }: { questionId: string }) => {
  const answers = await fetchAnswers(questionId);

  return (
    <div>
      {answers.length > 0 ? (
        <div>
          {answers.map((answer: any) => (
            <AnswerCard
              key={answer.id}
              answer={answer}
            />
          ))}
        </div>
      ) : (
        <div>No answers yet</div>
      )}
    </div>
  );
};

export default AnswersList;
