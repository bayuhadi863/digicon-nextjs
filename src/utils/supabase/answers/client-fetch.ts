'use client';

import { createClient } from '../client';

export const fetchAnswerLikesByAnswerIdAndUserId = async (answerId: string, userId: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.from('answer_likes').select().eq('answer_id', answerId).eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
