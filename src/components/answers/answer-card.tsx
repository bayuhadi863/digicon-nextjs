import React from 'react';
// mantine import
import { Box, Text } from '@mantine/core';
// utils import
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
import { getCurrentUser } from '@/utils/supabase/auth/fetch';
// component import
import DeleteAnswerButton from './delete-answer-button';
import EditAnswerButton from './edit-answer-button';
import LikeAnswerButton from './like-answer-button';
// utils import
import { format } from 'date-fns';
import { fetchAnswerLikesByAnswerIdAndUserId, fetchAnswerLikesByAnswerId } from '@/utils/supabase/answers/fetch';

const AnswerCard = async ({ answer }: { answer: any }) => {
  const profile = await fetchProfileByUserId(answer.user_id);
  const authUser = await getCurrentUser();
  const userAnswerLikes = await fetchAnswerLikesByAnswerIdAndUserId(answer.id, authUser!.id);
  const answerLikes = await fetchAnswerLikesByAnswerId(answer.id);

  const isUserAnswer = authUser!.id === answer.user_id;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return format(d, 'MMMM dd, yyyy');
  };

  return (
    <>
      <div className='mb-6'>
        <div className='mb-2 flex justify-between items-center'>
          <p className='text-sm font-semibold'>
            @{profile.username} {isUserAnswer && <span>(You)</span>}
          </p>

          <Text
            size='xs'
            c='dimmed'
          >
            {formatDate(answer.updated_at)}
          </Text>
        </div>
        <Box darkHidden>
          <div
            className='prose prose-sm prose-code:text-sm break-all whitespace-normal mb-3'
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
        </Box>
        <Box lightHidden>
          <div
            className='prose prose-invert prose-sm prose-code:text-sm break-all whitespace-normal mb-3'
            dangerouslySetInnerHTML={{ __html: answer.content }}
          ></div>
        </Box>
        {isUserAnswer ? (
          <div className='mb-3 flex gap-2 items-center'>
            <EditAnswerButton answer={answer} />
            <DeleteAnswerButton answerId={answer.id} />
          </div>
        ) : (
          <div className='mb-3 flex gap-2 items-center'>
            <div className='flex gap-2 items-center'>
              <LikeAnswerButton
                answerId={answer.id}
                userAnswerLikes={userAnswerLikes}
              />
              <p className='text-sm'>{answerLikes.length}</p>
            </div>
          </div>
        )}
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
