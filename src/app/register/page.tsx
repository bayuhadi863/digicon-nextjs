'use client';

import React, { useState } from 'react';

// mantine import
import { TextInput, PasswordInput, Anchor, Paper, Title, Text, Button, LoadingOverlay, Box } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';

// Next js import
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// lib / utils import
import { createClient } from '@/utils/supabase/client';
import { register } from '@/utils/supabase/auth/actions';

const RegisterPage = () => {
  const form = useForm({
    mode: 'uncontrolled',
    validateInputOnChange: true,
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: {
      name: (value) => (value === '' ? 'Name is required' : value.length < 2 ? 'Too short name' : null),
      username: (value) => {
        if (value === '') return 'Username is required';
        if (value.length < 2) return 'Too short username';
        if (!/^[\w-]+$/.test(value)) return 'Username can only contain letters, numbers, hyphens (-), and underscores (_)';
        return null;
      },
      email: (value) => (value === '' ? 'Email is required' : /^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value === '' ? 'Password is required' : value.length < 6 ? 'Password is too short' : null),
      confirmPassword: (value, values) => (value === '' ? 'Password is required' : value !== values.password ? 'Passwords did not match' : null),
    },
  });

  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleForm = async () => {
    try {
      const email = form.getValues().email;
      const password = form.getValues().password;
      const name = form.getValues().name;
      const username = form.getValues().username;

      setIsLoading(true);

      await register(email, password, name, username);

      notifications.show({
        title: 'Registrasion Success!',
        message: 'You have successfully registered!',
        color: 'green',
      });

      setIsLoading(false);
    } catch (error: any) {
      notifications.show({
        title: 'Registrasion Failed!',
        message: error.message,
        color: 'red',
      });

      setIsLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen my-2 lg:my-8 mx-4'>
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
            radius='lg'
          >
            <form onSubmit={form.onSubmit(handleForm)}>
              <TextInput
                label='Name'
                placeholder='Your Name'
                radius='md'
                key={form.key('name')}
                {...form.getInputProps('name')}
              />
              <TextInput
                label='Username'
                mt='md'
                radius='md'
                placeholder='Your Username'
                key={form.key('username')}
                {...form.getInputProps('username')}
              />
              <TextInput
                label='Email'
                placeholder='you@gmail.com'
                mt='md'
                radius='md'
                key={form.key('email')}
                {...form.getInputProps('email')}
              />
              <PasswordInput
                label='Password'
                placeholder='Your password'
                mt='md'
                radius='md'
                key={form.key('password')}
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirm Password'
                placeholder='Your confirm password'
                mt='md'
                radius='md'
                key={form.key('confirmPassword')}
                {...form.getInputProps('confirmPassword')}
              />
              <Button
                fullWidth
                mt='xl'
                radius='md'
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
