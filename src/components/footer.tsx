import React from 'react';
// mantine import
import { Text } from '@mantine/core';

const Footer = () => {
  return (
    <footer className='mt-4 px-4 py-4'>
      <Text
        size='sm'
        c='dimmed'
        className='text-center'
      >
        © 2021 Digicon. All rights reserved.
      </Text>
    </footer>
  );
};

export default Footer;
