'use client';

import React, { useState } from 'react';
// mantine import
import { TextInput, Button, ActionIcon } from '@mantine/core';
// icon import
import { IoSearch } from 'react-icons/io5';
// next js import
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const [value, setValue] = useState('');

  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/questions?query=${value}`);
  };

  return (
    <form
      className='flex gap-3'
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder='Search'
        leftSection={<IoSearch />}
        size='md'
        radius='md'
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        className='grow'
      />
      <Button
        radius='md'
        size='md'
        type='submit'
        className='hidden md:block'
      >
        Search
      </Button>
      <ActionIcon
        variant='filled'
        radius='md'
        size='42'
        type='submit'
        className='block md:hidden'
      >
        <IoSearch size='25' />
      </ActionIcon>
    </form>
  );
};

export default SearchInput;
