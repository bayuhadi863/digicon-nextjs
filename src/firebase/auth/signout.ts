import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/config';

const signOutUser = async () => {
  let error = null;

  try {
    await signOut(auth);
  } catch (err: any) {
    error = err;
  }

  return error;
};

export default signOutUser;
