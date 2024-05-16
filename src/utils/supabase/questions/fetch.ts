import { createClient } from '../server';
import { getCurrentUser } from '../auth/fetch';

export const fetchFollowedTopicQuestions = async () => {
  const supabase = createClient();

  const currentUser = await getCurrentUser();

  const { data: questions, error } = await supabase.from('followed_topic_questions').select('*').eq('follower_id', currentUser!.id).order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return questions;
};
