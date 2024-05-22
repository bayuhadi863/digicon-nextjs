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
