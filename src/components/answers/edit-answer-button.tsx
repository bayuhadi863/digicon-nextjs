'use client';

import React, { useState } from 'react';
// mantine import
import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { BiEdit } from 'react-icons/bi';

const EditAnswerButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [editLoading, setEditLoading] = useState(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Delete Answer'
        centered
        radius='md'
      ></Modal>
      <button onClick={open}>
        <BiEdit className='text-blue-300 hover:text-blue-400' />
      </button>
    </div>
  );
};

export default EditAnswerButton;
