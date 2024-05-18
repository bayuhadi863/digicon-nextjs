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
