import React from 'react';
// components import
import QuestionCard from '../home/question-card';
import MyPagination from '../home/home-pagination';
// utils import
import { fetchAllQuestions } from '@/utils/supabase/questions/fetch';
// mantine import
import { Text } from '@mantine/core';

const AllQuestionsList = async ({ page, query }: { page: any; query: any }) => {
  const pageNumber = page ? parseInt(page) : 1;
  const allQuestions = await fetchAllQuestions();
  const limitedQuestions = await fetchAllQuestions(pageNumber, query);
  const allQueryQuestions = await fetchAllQuestions(undefined, query);

  // function to round up float number
  const roundUp = (num: number, precision: number) => {
    precision = Math.pow(10, precision);
    return Math.ceil(num * precision) / precision;
  };

  return (
    <div>
      {limitedQuestions.length > 0 ? (
        <div>
          {limitedQuestions.map((question: any) => (
            <div
              key={question.id}
              className='mb-4'
            >
              <QuestionCard question={question} />
            </div>
          ))}
        </div>
      ) : (
        <Text
          size='sm'
          c='dimmed'
        >
          No questions found
        </Text>
      )}

      <div className='mt-6 flex justify-center'>
        <MyPagination
          length={query ? roundUp(allQueryQuestions.length / 9, 0) : roundUp(allQuestions.length / 9, 0)}
          pageNumber={pageNumber}
          url='/questions'
          query={query}
        />
      </div>
    </div>
  );
};

export default AllQuestionsList;
