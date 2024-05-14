'use client';

import { createClient } from './client';

// insert question
export const insertQuestion = async (data: any) => {
  const supabase = createClient();

  const { data: questionData, error: questionError } = await supabase.from('questions').insert(data);

  if (questionError) {
    throw new Error(questionError.message);
  }

  return questionData;
};
