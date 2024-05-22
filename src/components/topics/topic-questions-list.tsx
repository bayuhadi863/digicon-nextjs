import React from 'react';
// utils
import { fetchQuestionsByTopicId } from '@/utils/supabase/questions/fetch';
// components import
import QuestionCard from '../home/question-card';
import MyPagination from '../home/home-pagination';

const TopicQuestionsList = async ({ topicId, page }: { topicId: string; page: any }) => {
  const pageNumber = page ? parseInt(page) : 1;

  const allQuestions = await fetchQuestionsByTopicId(topicId);
  const limitedQuestions = await fetchQuestionsByTopicId(topicId, pageNumber);

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
        <div>No questions found</div>
      )}

      <div className='mt-6 flex justify-center'>
        <MyPagination
          length={roundUp(allQuestions.length / 9, 0)}
          pageNumber={pageNumber}
          url={`/topics/${topicId}`}
        />
      </div>
    </div>
  );
};

export default TopicQuestionsList;
