import React from 'react';
// mantine import
import { Card, Badge } from '@mantine/core';
// next js import
import Link from 'next/link';

const QuestionCard = ({ question }: { question: any }) => {
  const getCleanContent = (content: string) => {
    return content.replace(/<\/?pre>/g, '');
  };

  return (
    <Card
      radius='md'
      withBorder
      className='mb-4'
    >
      <Badge
        color='blue'
        size='lg'
        radius='md'
      >
        {question.topic_name}
      </Badge>
      <Link
        href={`/questions/${question.id}`}
        className='font-medium text-lg my-2'
      >
        {question.title}
      </Link>
      <div
        className='text-sm break-all whitespace-normal line-clamp-2 text-inherit'
        dangerouslySetInnerHTML={{ __html: getCleanContent(question.content) }}
      ></div>
    </Card>
  );
};

export default QuestionCard;
