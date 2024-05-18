import React from 'react';
// utils
import { fetchQuestionsByTopicId } from '@/utils/supabase/questions/fetch';
// components import
import QuestionCard from '../home/question-card';

const TopicQuestionsList = async ({ topicId }: { topicId: string }) => {
  const questions = await fetchQuestionsByTopicId(topicId);

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          {questions.map((question: any) => (
            <QuestionCard
              key={question.id}
              question={question}
            />
          ))}
        </div>
      ) : (
        <div>No questions found</div>
      )}
    </div>
  );
};

export default TopicQuestionsList;
