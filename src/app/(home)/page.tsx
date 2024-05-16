import React from 'react';
// mantine import
import { Button, Group } from '@mantine/core';
// next js import
import Image from 'next/image';
// components import
import SearchInput from '@/components/home/search-input';
import QuestionsList from '@/components/home/questions-list';

const HomePage = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <div className='flex justify-between items-center'>
          <SearchInput />
          <Button
            size='md'
            radius='md'
          >
            Question
          </Button>
        </div>
        <div className='mt-6'>
          <h1 className='font-semibold text-2xl mb-4'>Questions</h1>
          <QuestionsList />
        </div>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default HomePage;
