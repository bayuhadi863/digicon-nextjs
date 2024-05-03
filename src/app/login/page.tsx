'use client';

import React, { useState, useEffect } from 'react';

// mantine import
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Group, Button, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Next js import
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// lib / utils import
import signIn from '@/firebase/auth/signin';
import { getUser } from '@/firebase/auth/getUser';
import { useAuthContext } from '@/context/auth-context';

const LoginPage = () => {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: (value) => (value === '' ? 'Email is required' : /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value === '' ? 'Password is required' : null),
    },
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async () => {
    const email = form.getValues().email;
    const password = form.getValues().password;

    setIsLoading(true);

    const { result, error } = await signIn(email, password);

    if (error) {
      setIsLoading(false);
      notifications.show({
        title: 'Login Failed!',
        message: error.message,
        color: 'red',
      });
      return;
      // return console.dir(error);
    }

    console.log('Sign In Success:', result);
    router.push('/');
    notifications.show({
      title: 'Login Success!',
      message: 'Welcome to Digicon!',
      color: 'green',
    });

    return;
  };

  return (
    <div className='flex justify-center items-center min-h-screen my-8 lg:my-0 mx-4'>
      <div className='w-96'>
        <Title ta='center'>Welcome back!</Title>
        <Text
          c='dimmed'
          size='sm'
          ta='center'
          mt={5}
        >
          Do not have an account yet?{' '}
          <Anchor
            size='sm'
            component={Link}
            href='/register'
          >
            Create account
          </Anchor>
          <Anchor
            size='sm'
            component={Link}
            href='/'
          >
            Home
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
                label='Email'
                placeholder='you@gmail.com'
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
              <Group
                justify='space-between'
                mt='lg'
              >
                <Checkbox label='Remember me' />
                <Anchor
                  component='button'
                  size='sm'
                >
                  Forgot password?
                </Anchor>
              </Group>
              <Button
                fullWidth
                mt='xl'
                type='submit'
              >
                Sign in
              </Button>
            </form>
          </Paper>
        </Box>
      </div>
    </div>
  );
};

export default LoginPage;
