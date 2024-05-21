'use server';

import { createClient } from '../server';
import { revalidatePath } from 'next/cache';

export const insertAnswer = async (answerData: any) => {
  const supabase = createClient();

  try {
    await supabase.from('answers').insert(answerData);
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};

// delete answer
export const deleteAnswer = async (answerId: string) => {
  const supabase = createClient();

  try {
    await supabase.from('answers').delete().eq('id', answerId);
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};
