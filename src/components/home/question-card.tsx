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

  const getRandColor = (text: string) => {
    const length = text.length;

    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'indigo', 'teal', 'cyan'];

    return colors[length % colors.length];
  };

  return (
    <Card
      radius='md'
      withBorder
      component={Link}
      href={`/questions/${question.id}`}
    >
      <div className='flex justify-between items-center text-inherit flex-wrap gap-2'>
        <Badge
          color={getRandColor(question.topic_name)}
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
      <h3 className='font-medium text-lg my-2 break-all whitespace-normal line-clamp-2'>{question.title}</h3>
      <div
        className='text-sm break-all whitespace-normal line-clamp-2 text-inherit'
        dangerouslySetInnerHTML={{ __html: getCleanContent(question.content) }}
      ></div>
    </Card>
  );
};

export default QuestionCard;
