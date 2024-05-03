'use client';

import React, { useState } from 'react';

// mantine import
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Group, Button, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Next js import
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// lib / utils import
import signUp from '@/firebase/auth/signup';


const RegisterPage = () => {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value === '' ? 'Name is required' : value.length < 2 ? 'Too short name' : null),
      email: (value) => (value === '' ? 'Email is required' : /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value === '' ? 'Password is required' : value.length < 6 ? 'Password is too short' : null),
      confirmPassword: (value, values) => (value === '' ? 'Password is required' : value !== values.password ? 'Passwords did not match' : null),
    },
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async () => {
    const email = form.getValues().email;
    const password = form.getValues().password;

    setIsLoading(true);

    const { result, error } = await signUp(email, password);

    if (error) {
      setIsLoading(false);
      notifications.show({
        title: 'Registrasion Failed!',
        message: error.message,
        color: 'red',
      });
      return;
      // return console.dir(error);
    }

    // else successful
    console.log(result);
    setIsLoading(false);
    router.push('/');
    notifications.show({
      title: 'Registrasion Success!',
      message: 'You have successfully registered!',
      color: 'green',
    });

    return;
  };


  return (
    <div className='flex justify-center items-center min-h-screen my-8 mx-4'>
      <div className='w-96'>
        <Title ta='center'>Welcome to Digicon!</Title>
        <Text
          c='dimmed'
          size='sm'
          ta='center'
          mt={5}
        >
          Already have an account?{' '}
          <Anchor
            size='sm'
            component={Link}
            href='/login'
          >
            Sign in
          </Anchor>
        </Text>

        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />
          <Paper
            withBorder
            shadow='md'
            p={30}
            mt={30}
            radius='md'
          >
            <form onSubmit={form.onSubmit(handleForm)}>
              <TextInput
                label='Name'
                placeholder='Your Name'
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput
                label='Email'
                placeholder='you@gmail.com'
                mt='md'
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label='Password'
                placeholder='Your password'
                mt='md'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirm Password'
                placeholder='Your confirm password'
                mt='md'
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
              />
              <Button
                fullWidth
                mt='xl'
                type='submit'
              >
                Sign up
              </Button>
            </form>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default RegisterPage;
