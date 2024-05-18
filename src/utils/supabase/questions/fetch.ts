import { createClient } from '../server';
import { getCurrentUser } from '../auth/fetch';

export const fetchFollowedTopicQuestions = async () => {
  const supabase = createClient();

  const currentUser = await getCurrentUser();

  const { data: questions, error } = await supabase.from('followed_topic_questions').select('*').eq('follower_id', currentUser!.id).order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};

export const fetchQuestionById = async (questionId: string) => {
  const supabase = createClient();

  const { data: question, error } = await supabase.from('question_details').select('*').eq('id', questionId);

  if (error) {
    throw new Error(error.message);
  }

  return question[0];
};

export const fetchQuestionsByTopicId = async (topicId: string) => {
  const supabase = createClient();

  const { data: questions, error } = await supabase.from('topic_questions').select('*').eq('topic_id', topicId).order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};
