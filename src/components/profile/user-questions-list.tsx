import React from 'react';
// utils import
import { fetchQuestionsByUserId } from '@/utils/supabase/questions/fetch';
// components import
import QuestionCard from '../home/question-card';
// mantine import
import { Text } from '@mantine/core';

const UserQuestionsList = async ({ userId }: { userId: string }) => {
  const questions = await fetchQuestionsByUserId(userId);

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>My Questions ({questions.length})</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {questions.length > 0 ? (
          questions.map((question: any) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          ))
        ) : (
          <Text
            size='sm'
            c='dimmed'
          >
            No questions found
          </Text>
        )}
      </div>
    </div>
  );
};

export default UserQuestionsList;
