import React from 'react';
// mantine import
import { Card, Badge, Text } from '@mantine/core';
// next js import
import Link from 'next/link';
// utils import
import { format } from 'date-fns';

const QuestionCard = ({ question }: { question: any }) => {
  const getCleanContent = (content: string) => {
    return content.replace(/<\/?pre>/g, '');
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return format(d, 'MMMM dd, yyyy');
  };

  return (
    <Card
      radius='md'
      withBorder
    >
      <div className='flex justify-between items-center text-inherit flex-wrap gap-2'>
        <Badge
          color='blue'
          // size='lg'
          radius='sm'
          variant='outline'
        >
          {question.topic_name}
        </Badge>
        <Text
          size='xs'
          c='dimmed'
        >
          {formatDate(question.updated_at)}
        </Text>
      </div>
      <Link
        href={`/questions/${question.id}`}
        className='font-medium text-lg my-2 break-all whitespace-normal line-clamp-2'
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
