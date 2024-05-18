'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../server';
import { insertProfile } from '../profile/actions';

export const logoutUser = async () => {
  const supabase = createClient();

  try {
    await supabase.auth.signOut();
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/login');
};

export const register = async (email: string, password: string, name: string, username: string) => {
  const supabase = createClient();

  try {
    await supabase.auth.signUp({
      email,
      password,
    });

    await insertProfile({
      name: name,
      username: username,
      email: email,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/');
};

export const login = async (email: string, password: string) => {
  const supabase = createClient();

  try {
    await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/');
};
