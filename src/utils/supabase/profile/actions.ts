'use server';

import { createClient } from '../server';

export const insertProfile = async (profileData: any) => {
  const supabase = createClient();

  try {
    await supabase.from('profiles').insert(profileData).select();
  } catch (error: any) {
    throw new Error(error.message);
  }
};
