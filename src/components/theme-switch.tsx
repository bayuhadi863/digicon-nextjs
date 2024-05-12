'use client';

import React from 'react';
// mantine import
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
// icons import
import { MdOutlineWbSunny } from 'react-icons/md';
import { FiMoon } from 'react-icons/fi';

const ThemeSwitch = () => {
  const { setColorScheme } = useMantineColorScheme();

  return (
    <>
      <ActionIcon
        variant='default'
        aria-label='Theme'
        size='42'
        color='gray'
        radius='xl'
        onClick={() => setColorScheme('light')}
        lightHidden
      >
        <MdOutlineWbSunny size='1.2rem' />
      </ActionIcon>
      <ActionIcon
        variant='default'
        aria-label='Theme'
        onClick={() => setColorScheme('dark')}
        size='42'
        radius='xl'
        color='#000000'
        darkHidden
      >
        <FiMoon size='1.2rem' />
      </ActionIcon>
    </>
  );
};

export default ThemeSwitch;
