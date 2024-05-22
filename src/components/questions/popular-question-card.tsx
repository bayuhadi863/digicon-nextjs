import React from 'react';
// mantine import
import { Card } from '@mantine/core';
// next js import
import Link from 'next/link';

const PopularQuestionCard = ({ question }: { question: any }) => {
  const getCleanContent = (content: string) => {
    return content.replace(/<\/?pre>/g, '');
  };

  return (
    <Card
      withBorder
      radius='md'
    >
      <div className='mb-2'>
        <Link
          href={`/questions/${question.id}`}
          className='font-semibold line-clamp-2 break-all whitespace-normal'
        >
          {question.title}
        </Link>
      </div>

      <div
        className='text-sm break-all whitespace-normal line-clamp-1 text-inherit'
        dangerouslySetInnerHTML={{ __html: getCleanContent(question.content) }}
      ></div>
    </Card>
  );
};

export default PopularQuestionCard;
