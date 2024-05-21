'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '../server';
import { checkIfTopicFollowed } from '../topics/fetch';

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
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

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

    const topicFollowers = await checkIfTopicFollowed(topicId, user!.id);

    if (topicFollowers.length < 1) {
      await supabase.from('topic_followers').insert({ topic_id: topicId });
    }

    
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)');
  redirect('/');
};

export const updateQuestion = async (questionData: any, questionId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.from('questions').update(questionData).eq('id', questionId).select();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateQuestionImages = async (imageUrl: string, questionId: string) => {
  const supabase = createClient();

  try {
    await supabase.from('question_images').update({ image_url: imageUrl }).eq('question_id', questionId);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// update question
export const updateQuestionData = async (questionId: string, topicId: string, title: string, content: string, imageUrl: string | null) => {
  try {
    await updateQuestion(
      {
        topic_id: topicId,
        content: content,
        title: title,
      },
      questionId
    );

    if (imageUrl) {
      await updateQuestionImages(imageUrl, questionId);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)/questions/[id]');
};

// delete question
export const deleteQuestion = async (questionId: string) => {
  const supabase = createClient();

  try {
    await supabase.from('questions').delete().eq('id', questionId);
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/(home)');
  redirect('/');
};
