import React from 'react';
// utils
import { fetchFollowedTopicQuestions } from '@/utils/supabase/questions/fetch';
// components import
import QuestionCard from './question-card';

const QuestionsList = async () => {
  const questions = await fetchFollowedTopicQuestions();

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {questions.map((question: any) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          ))}
        </div>
      ) : (
        <div>No questions found</div>
      )}
    </div>
  );
};

export default QuestionsList;
