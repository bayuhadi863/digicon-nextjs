import React from 'react';
// mantine import
import { Text } from '@mantine/core';
// utils import
import { fetchAnswersByUserId } from '@/utils/supabase/answers/fetch';
// components import
import UserAnswerCard from './user-answer-card';

const UserAnswersList = async ({ userId }: { userId: string }) => {
  const answers = await fetchAnswersByUserId(userId);

  return (
    <div>
      <h3 className='text-xl font-semibold mb-4'>My Answers ({answers.length})</h3>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {answers.length > 0 ? (
          answers.map((answer: any) => (
            <UserAnswerCard
              key={answer.id}
              answer={answer}
            />
          ))
        ) : (
          <Text
            size='sm'
            c='dimmed'
          >
            No answers found
          </Text>
        )}
      </div>
    </div>
  );
};

export default UserAnswersList;
