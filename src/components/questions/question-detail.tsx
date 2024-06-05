import React, { Suspense } from 'react';
// utils import
import { fetchQuestionById } from '@/utils/supabase/questions/fetch';
import { getCurrentUser } from '@/utils/supabase/auth/fetch';
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
import { format } from 'date-fns';
// component import
import QuestionContent from './question-content';
import EditQuestion from './edit-question';
import DeleteQuestion from './delete-question';
import QuestionAnswers from '../answers/question-answers';
// next js import
import Image from 'next/image';
import Link from 'next/link';
// mantine import
import { Badge, Avatar, Text } from '@mantine/core';
// image import
import UserImage from '/public/assets/images/user.png';

const QuestionDetail = async ({ questionId }: { questionId: string }) => {
  const currentUser = await getCurrentUser();
  const question = await fetchQuestionById(questionId);
  const profile = await fetchProfileByUserId(question.user_id);

  const userQuestion = question.user_id === currentUser?.id;

  const formatDate = (date: string) => {
    const d = new Date(date);
    return format(d, 'MMMM dd, yyyy');
  };

  const getRandColor = (text: string) => {
    const length = text.length;

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'indigo', 'teal', 'cyan'];

    return colors[length % colors.length];
  };

  return (
    <div>
      <h1 className='text-2xl font-semibold mb-4'>{question.title}</h1>
      <div className='mb-4'>
        <Badge
          radius='sm'
          variant='outline'
          color={getRandColor(question.topic_name)}
        >
          {question.topic_name}
        </Badge>
      </div>
      <div className='mb-6 flex justify-between flex-wrap gap-4 items-center'>
        <div className='flex items-center gap-2 '>
          <Avatar
            src={profile.profile_picture ? profile.profile_picture : UserImage.src}
            alt='User'
            size={26}
          />
          <p className='text-sm font-semibold break-all whitespace-normal line-clamp-1'>@{profile.username}</p>
        </div>
        <Text
          size='xs'
          c='dimmed'
        >
          {formatDate(question.updated_at)}
        </Text>
      </div>
      {question.image_url && (
        <div className='mb-6 '>
          <Link
            href={question.image_url}
            target='_blank'
          >
            <Image
              src={question.image_url}
              alt='image'
              width={500}
              height={500}
              className='w-full'
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

      <div className='mt-6 pt-4 border-t border-gray-400'>
        <Suspense fallback={<p>Answers loading ...</p>}>
          <QuestionAnswers
            questionId={questionId}
            userQuestion={userQuestion}
            userId={currentUser!.id}
          />
        </Suspense>
      </div>
    </div>
  );
};

export default QuestionDetail;
