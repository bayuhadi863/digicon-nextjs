'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../server';

export const insertQuestion = async (questionData: any) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('questions').insert(questionData).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// insert question images
export const insertQuestionImages = async (data: any) => {
  const supabase = createClient();

  try {
    await supabase.from('question_images').insert(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// insert questions data
export const insertQuestionData = async (topicId: string, title: string, content: string, imageUrl: string | null) => {
  try {
    const question = await insertQuestion({
      topic_id: topicId,
      content: content,
      title: title,
    });

    // console.log(question);
    if (imageUrl) {
      if (question && question.length > 0) {
        await insertQuestionImages({
          question_id: question[0].id,
          image_url: imageUrl,
        });
      } else {
        throw new Error('Failed to insert question');
      }
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)');
  redirect('/');
};
