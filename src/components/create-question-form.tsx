'use client';

import React from 'react';
// mantine import
import { useForm } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';

const CreateQuestionForm = () => {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label='Email'
        placeholder='your@email.com'
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Button type='submit'>Submit</Button>
    </form>
  );
};

export default CreateQuestionForm;
