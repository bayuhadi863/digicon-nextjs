'use client';

import React, { useState } from 'react';

// mantine import
import { TextInput, PasswordInput, Checkbox, Anchor, Paper, Title, Text, Group, Button, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Next js import
import Link from 'next/link';

// lib / utils import
import { login } from '@/utils/supabase/auth/actions';

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

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async (e: any) => {
    e.preventDefault();

    try {
      const email = form.getValues().email;
      const password = form.getValues().password;

      setIsLoading(true);

      await login(email, password);

      notifications.show({
        title: 'Login Success!',
        message: 'Welcome to Digicon!',
        color: 'green',
      });

      setIsLoading(false);
    } catch (error: any) {
      notifications.show({
        title: 'Login Failed!',
        message: error.message,
        color: 'red',
      });

      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen my-2 lg:my-0 mx-4'>
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
        </Text>

        <Box pos='relative'>
          <LoadingOverlay
            visible={isLoading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
            loaderProps={{ color: 'pink', type: 'bars' }}
          />
          <Paper
            withBorder
            shadow='md'
            p={30}
            mt={30}
            radius='lg'
          >
            <form
              onSubmit={form.onSubmit((values, event) => {
                handleForm(event);
              })}
            >
              <TextInput
                label='Email'
                placeholder='you@gmail.com'
                key={form.key('email')}
                {...form.getInputProps('email')}
                radius='md'
              />
              <PasswordInput
                label='Password'
                placeholder='Your password'
                mt='md'
                radius='md'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />

              <Button
                fullWidth
                mt='xl'
                type='submit'
                radius='md'
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
