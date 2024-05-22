import React from 'react';
// utils
import { fetchFollowedTopicQuestions } from '@/utils/supabase/questions/fetch';
// components import
import QuestionCard from './question-card';
import MyPagination from './home-pagination';
// mantine import
import { Text, Button } from '@mantine/core';
// next js import
import Link from 'next/link';

const QuestionsList = async ({ page }: { page: any }) => {
  const pageNumber = page ? parseInt(page) : 1;

  // wait 5 seconds
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  const questions = await fetchFollowedTopicQuestions(pageNumber);
  const allQuestions = await fetchFollowedTopicQuestions();

  // function to round up float number
  const roundUp = (num: number, precision: number) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };
  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {questions.map((question: any) => (
            <div
              key={question.id}
              className='mb-4'
            >
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Text
            size='sm'
            c='dimmed'
            className='mb-4'
          >
            No questions found
          </Text>
          <Button
            radius='md'
            component={Link}
            href='/topics'
          >
            Follow New Topics
          </Button>
        </div>
      )}

      <div className='mt-6 flex justify-center'>
        <MyPagination
          length={roundUp(allQuestions.length / 9, 0)}
          pageNumber={pageNumber}
          url='/'
        />
      </div>
    </div>
  );
};

export default QuestionsList;
