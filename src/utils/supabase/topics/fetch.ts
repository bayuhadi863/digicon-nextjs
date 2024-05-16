import { createClient } from '../server';

export const insertTopic = async (data: any) => {
  const supabase = createClient();

  const { data: topicData, error: topicError } = await supabase.from('topics').insert(data);

  if (topicError) {
    throw new Error(topicError.message);
  }

  return topicData;
};

// fetch all topics
export const fetchTopics = async () => {
  const supabase = createClient();

  const { data: topics, error } = await supabase.from('topics').select('*').range(0, 8);

  if (error) {
    throw new Error(error.message);
  }

  return topics;
};

// insert topic followers
export const insertTopicFollower = async (data: any) => {
  const supabase = createClient();

  const { data: topicFollowersData, error: topicFollowersError } = await supabase.from('topic_followers').insert(data);

  if (topicFollowersError) {
    throw new Error(topicFollowersError.message);
  }

  return topicFollowersData;
};

// fetch topic followers by current user id
export const fetchTopicFollowersByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data: topicFollowers, error } = await supabase.from('topic_followers').select('*').eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return topicFollowers;
};

// check if topic is followed by user
export const checkIfTopicFollowed = async (topicId: string, userId: string) => {
  const supabase = createClient();

  const { data: topicFollowers, error } = await supabase.from('topic_followers').select('*').eq('topic_id', topicId).eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return topicFollowers;
};

// get topic followers count
export const getTopicFollowersCount = async (topicId: string) => {
  const supabase = createClient();

  const { data: topicFollowers, error } = await supabase.from('topic_followers').select('user_id').eq('topic_id', topicId);

  if (error) {
    throw new Error(error.message);
  }

  return topicFollowers;
};

// fetch topic by id
export const fetchTopicById = async (topicId: string) => {
  const supabase = createClient();

  const { data: topic, error } = await supabase.from('topics').select('*').eq('id', topicId);

  if (error) {
    throw new Error(error.message);
  }

  return topic[0];
};

// fetch most followed topics limit 4
export const fetchMostFollowedTopics = async () => {
  const supabase = createClient();

  const { data: topics, error } = await supabase.from('topic_followers_count').select('*').order('follower_count', { ascending: false }).range(0, 2);

  if (error) {
    throw new Error(error.message);
  }

  return topics;
};

// fetch all topics for select data
export const fetchTopicsForSelect = async () => {
  const supabase = createClient();

  const { data: topics, error } = await supabase.from('topics').select('*');

  if (error) {
    throw new Error(error.message);
  }

  // format data for select component (value, label)
  topics.forEach((topic: any) => {
    topic.value = topic.id;
    topic.label = topic.name;
  });

  return topics;
};

// get realtime topic followers
export const getRealtimeTopicFollowers = async () => {
  const supabase = createClient();

  const topicFollowers = supabase
    .channel('custom-all-channel')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'topic_followers' }, (payload) => {
      console.log('Change received!', payload.new);
    })
    .subscribe();

  return topicFollowers;
};
