'use client';

import React from 'react';
// mantine import
import { TextInput } from '@mantine/core';
// icon import
import { IoSearch } from 'react-icons/io5';

const SearchInput = () => {
  return (
    <form className='w-96'>
      <TextInput
        placeholder='Search'
        leftSection={<IoSearch />}
        size='md'
        radius="md"
      />
    </form>
  );
};

export default SearchInput;
