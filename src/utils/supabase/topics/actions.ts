'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '../server';

export const insertTopic = async (data: any) => {
  try {
    const supabase = createClient();

    await supabase.from('topics').insert(data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const insertTopicFollower = async (data: any) => {
  const supabase = createClient();

  try {
    await supabase.from('topic_followers').insert(data);
    revalidatePath('/(home)/topics/[id]');
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// delete topic follower
export const deleteTopicFollower = async (topicId: string, userId: string) => {
  const supabase = createClient();

  try {
    await supabase.from('topic_followers').delete().eq('topic_id', topicId).eq('user_id', userId);
    revalidatePath('/(home)/topics/[id]');
  } catch (error: any) {
    throw new Error(error.message);
  }
};
