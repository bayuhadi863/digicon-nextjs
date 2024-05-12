'use client';

import { createClient } from './client';

// fetch profile by user id
export const fetchProfileByUserId = async (userId: string) => {
  const supabase = createClient();

  const { data: profiles, error } = await supabase.from('profiles').select('*').eq('id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return profiles[0];
};
