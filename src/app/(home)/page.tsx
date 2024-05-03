'use client';

import React from 'react';
import { useMantineColorScheme, Button, Group } from '@mantine/core';

const HomePage = () => {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <div className='h-[1000px]'>
      <p>HomePage</p>
      <Group>
        <Button onClick={() => setColorScheme('light')}>Light</Button>
        <Button onClick={() => setColorScheme('dark')}>Dark</Button>
      </Group>
    </div>
  );
};

export default HomePage;
