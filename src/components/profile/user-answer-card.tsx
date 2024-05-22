import React from 'react';
// mantine import
import { Card } from '@mantine/core';
// next js import
import Link from 'next/link';

const UserAnswerCard = ({ answer }: { answer: any }) => {
  const getCleanContent = (content: string) => {
    return content.replace(/<\/?pre>/g, '');
  };
  return (
    <Card
      radius='md'
      withBorder
      component={Link}
      href={`/questions/${answer.question_id}`}
    >
      <div className='mb-3'>
        <p className='text-sm font-bold mb-1'>Question Title:</p>
        <h3 className='font-medium text-lg break-all whitespace-normal line-clamp-1'>{answer.question_title}</h3>
      </div>
      <div>
        <p className='text-sm font-bold mb-1'>Your Answer:</p>
        <div
          className='text-sm break-all whitespace-normal line-clamp-2 text-inherit'
          dangerouslySetInnerHTML={{ __html: getCleanContent(answer.content) }}
        ></div>
      </div>
    </Card>
  );
};

export default UserAnswerCard;
