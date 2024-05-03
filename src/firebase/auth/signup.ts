import { auth } from '../config';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

export default async function signUp(email: string, password: string) {
  let result = null,
    error = null;

  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e: any) {
    error = e;
  }

  return { result, error };
}
