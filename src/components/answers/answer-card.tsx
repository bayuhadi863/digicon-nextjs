import React from 'react';
// mantine import
import { Box } from '@mantine/core';
// utils import
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
// component import
import DeleteAnswerButton from './delete-answer-button';

const AnswerCard = async ({ answer }: { answer: any }) => {
  const profile = await fetchProfileByUserId(answer.user_id);

  return (
    <>
      <div className='mb-6'>
        <div className='mb-2'>
          <p className='text-sm font-semibold'>{profile.name}</p>
        </div>
        <Box darkHidden>
          <div
            className='prose prose-sm prose-code:text-sm break-all whitespace-normal'
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
        </Box>
        <Box lightHidden>
          <div
            className='prose prose-invert prose-sm prose-code:text-sm break-all whitespace-normal'
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
        </Box>
        <div className='my-3'>
          <DeleteAnswerButton answerId={answer.id} />
        </div>
        <Box lightHidden>
          <div className='border-b border-gray-700'></div>
        </Box>
        <Box darkHidden>
          <div className='border-b border-gray-300'></div>
        </Box>
      </div>
    </>
  );
};

export default AnswerCard;
