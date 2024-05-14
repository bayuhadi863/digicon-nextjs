'use client';

import React from 'react';
// mantine import
import { Button, Group } from '@mantine/core';
// next js import
import Image from 'next/image';
// components import
import SearchInput from '@/components/home/search-input';

const HomePage = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-16'>
      <div className='col-span-2'>
        <div className='flex justify-between items-center'>
          <SearchInput />
          <Button
            size='md'
            
          >
            Question
          </Button>
        </div>
      </div>
      <div>Kanan</div>
    </div>
  );
};

export default HomePage;
