'use server';

import { createClient } from '../server';
import { revalidatePath } from 'next/cache';

export const insertProfile = async (profileData: any) => {
  const supabase = createClient();

  try {
    await supabase.from('profiles').insert(profileData).select();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// update profile
export const updateProfile = async (profileData: any, userId: string) => {
  const supabase = createClient();

  try {
    await supabase.from('profiles').update(profileData).eq('id', userId);
  } catch (error: any) {
    throw new Error(error.message);
  }

  revalidatePath('/profile');
};
