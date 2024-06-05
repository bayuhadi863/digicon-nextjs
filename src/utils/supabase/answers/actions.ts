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

// update answer
export const updateAnswer = async (answerId: string, answerData: any) => {
  const supabase = createClient();

  try {
    await supabase.from('answers').update(answerData).eq('id', answerId);
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};

// insert answer_likes
export const insertAnswerLike = async (answerLikeData: any) => {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('answer_likes').insert(answerLikeData);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};

// delete answer_likes by id
export const deleteAnswerLike = async (answerLikeId: string) => {
  const supabase = createClient();

  try {
    const { error } = await supabase.from('answer_likes').delete().eq('id', answerLikeId);

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};
