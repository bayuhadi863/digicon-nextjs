import { createClient } from '../server';
import { getCurrentUser } from '../auth/fetch';

export const fetchFollowedTopicQuestions = async (page?: number) => {
  const supabase = createClient();

  const currentUser = await getCurrentUser();

  if (page) {
    const dataEnd = page * 9;
    const dataStart = dataEnd - 9;

    const { data: questions, error } = await supabase
      .from('followed_topic_questions')
      .select('*')
      .eq('follower_id', currentUser!.id)
      .order('created_at', { ascending: false })
      .range(dataStart, dataEnd - 1);

    if (error) {
      throw new Error(error.message);
    }

    return questions;
  }

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

export const fetchQuestionsByTopicId = async (topicId: string, page?: number) => {
  const supabase = createClient();

  if (page) {
    const dataEnd = page * 9;
    const dataStart = dataEnd - 9;

    const { data: questions, error } = await supabase
      .from('topic_questions')
      .select('*')
      .eq('topic_id', topicId)
      .order('created_at', { ascending: false })
      .range(dataStart, dataEnd - 1);

    if (error) {
      throw new Error(error.message);
    }

    return questions;
  }

  const { data: questions, error } = await supabase.from('topic_questions').select('*').eq('topic_id', topicId).order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};

export const fetchQuestionsAnswersCount = async () => {
  const supabase = createClient();

  const { data: questions, error } = await supabase.from('questions_by_answers_count').select('*').range(0, 2);

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};

export const fetchQuestionsByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data: questions, error } = await supabase.from('followed_topic_questions').select('*').eq('user_id', userId).order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};

export const fetchAllQuestions = async (page?: number, query?: string) => {
  const supabase = createClient();

  if (page) {
    if (query) {
      const dataEnd = page * 9;
      const dataStart = dataEnd - 9;
      const { data: questions, error } = await supabase
        .from('questions_with_topics')
        .select('*')
        .or(`title.ilike.%${query}%,content.ilike.%${query}%,topic_name.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .range(dataStart, dataEnd - 1);

      if (error) {
        throw new Error(error.message);
      }

      return questions;
    }

    const dataEnd = page * 9;
    const dataStart = dataEnd - 9;
    const { data: questions, error } = await supabase
      .from('questions_with_topics')
      .select('*')
      .order('created_at', { ascending: false })
      .range(dataStart, dataEnd - 1);

    if (error) {
      throw new Error(error.message);
    }

    return questions;
  }

  if (query) {
    const { data: questions, error } = await supabase.from('questions_with_topics').select('*').or(`title.ilike.%${query}%,content.ilike.%${query}%,topic_name.ilike.%${query}%`).order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return questions;
  }

  const { data: questions, error } = await supabase.from('questions_with_topics').select('*').order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};
