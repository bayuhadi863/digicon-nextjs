import React from 'react';
// component import
import CategoryTitle from '../topics/category-title';
import PopularQuestionCard from '../questions/popular-question-card';
// utils import
import { fetchQuestionsAnswersCount } from '@/utils/supabase/questions/fetch';

const PopularQuestions = async () => {
  const questions = await fetchQuestionsAnswersCount();

  return (
    <div className='mt-2'>
      <h4 className='font-semibold text-xl'>Popular Questions</h4>
      <div className='mt-2'>
        {questions.length > 0 ? (
          <div className='grid grid-cols-1 gap-4'>
            {questions.map((question: any) => (
              <PopularQuestionCard
                key={question.id}
                question={question}
              />
            ))}
          </div>
        ) : (
          <div>No topics found</div>
        )}
      </div>
    </div>
  );
};

export default PopularQuestions;
