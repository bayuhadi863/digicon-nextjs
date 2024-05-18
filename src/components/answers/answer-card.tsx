import React from 'react';
// mantine import
import { Box } from '@mantine/core';
// utils import
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';

const AnswerCard = async ({ answer }: { answer: any }) => {
  const profile = await fetchProfileByUserId(answer.user_id);

  return (
    <div className='mb-6'>
      <div className='mb-2'>
        <p className='text-sm font-semibold'>{profile.name}</p>
      </div>
      <Box darkHidden>
        <div
          className='prose prose-sm prose-code:text-sm'
          dangerouslySetInnerHTML={{ __html: answer.content }}
        ></div>
      </Box>
      <Box lightHidden>
        <div
          className='prose prose-invert prose-sm prose-code:text-sm'
          dangerouslySetInnerHTML={{ __html: answer.content }}
        ></div>
      </Box>
    </div>
  );
};

export default AnswerCard;
