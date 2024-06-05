import { createClient } from '../server';

export const fetchAnswers = async (questionId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('answers').select().eq('question_id', questionId).order('created_at', {
    ascending: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchAnswersByUserId = async (userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('answers_with_questions').select().eq('user_id', userId).order('created_at', {
    ascending: false,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchAnswerLikesByAnswerIdAndUserId = async (answerId: string, userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('answer_likes').select().eq('answer_id', answerId).eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const fetchAnswerLikesByAnswerId = async (answerId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('answer_likes').select().eq('answer_id', answerId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}


