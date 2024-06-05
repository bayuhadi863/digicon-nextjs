'use server';

import { redirect } from 'next/navigation';
import { createClient } from '../server';
import { insertProfile } from '../profile/actions';

export const logoutUser = async () => {
  const supabase = createClient();

  try {
    let { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message);
    }
  } catch (error: any) {
    throw new Error(error.message);
  }

  redirect('/login');
};

export const register = async (email: string, password: string, name: string, username: string) => {
  const supabase = createClient();

  try {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

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
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.log('error', error);
      throw new Error(error.message);
    }

    console.log('Login success');
  } catch (error: any) {
    console.log('error', error);
    throw new Error(error.message);
  }

  redirect('/');
};
