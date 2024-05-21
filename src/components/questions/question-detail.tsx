import React from 'react';
// utils import
import { fetchQuestionById } from '@/utils/supabase/questions/fetch';
import { getCurrentUser } from '@/utils/supabase/auth/fetch';
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
// component import
import QuestionContent from './question-content';
import EditQuestion from './edit-question';
import DeleteQuestion from './delete-question';
import QuestionAnswers from '../answers/question-answers';
// next js import
import Image from 'next/image';
import Link from 'next/link';
// mantine import
import { Badge } from '@mantine/core';

const QuestionDetail = async ({ questionId }: { questionId: string }) => {
  const currentUser = await getCurrentUser();
  const question = await fetchQuestionById(questionId);
  const profile = await fetchProfileByUserId(question.user_id);

  const userQuestion = question.user_id === currentUser?.id;

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>{question.title}</h1>
      <div className='mb-4'>
        <Badge
          radius='sm'
          variant='outline'
        >
          {question.topic_name}
        </Badge>
      </div>
      <div className='mb-6'>
        <p className='text-sm font-semibold'>{profile.name}</p>
      </div>
      {question.image_url && (
        <div className='mb-6'>
          <Link
            href={question.image_url}
            target='_blank'
          >
            <Image
              src={question.image_url}
              alt='image'
              width={500}
              height={500}
            />
          </Link>
        </div>
      )}

      <QuestionContent content={question.content} />

      {userQuestion && (
        <div className='mt-6 flex gap-3'>
          <EditQuestion question={question} />
          <DeleteQuestion question={question} />
        </div>
      )}

      <div className='mt-6 py-4 border-t border-gray-400'>
        <QuestionAnswers
          questionId={questionId}
          userQuestion={userQuestion}
        />
      </div>
    </div>
  );
};

export default QuestionDetail;
