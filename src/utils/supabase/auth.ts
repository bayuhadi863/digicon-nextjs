'use client';

import { createClient } from './client';

// get current user
export const getCurrentUser = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

// logout user
export const logoutUser = async () => {
  try {
    const supabase = createClient();
    await supabase.auth.signOut();
  } catch (error: any) {
    console.error('Error logging out:', error.message);
    throw new Error(error.message);
  }
};
