'use client';

import React, { useState } from 'react';
// mantine import
import { Modal, ActionIcon, Box, LoadingOverlay } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { BiEdit } from 'react-icons/bi';
// component import
import EditAnswerForm from './edit-answer-form';

const EditAnswerButton = ({ answer }: { answer: any }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Edit Answer'
        centered
        radius='md'
        size='xl'
      >
        <EditAnswerForm
          answer={answer}
          close={close}
        />
      </Modal>
      <ActionIcon
        variant='outline'
        size='sm'
        color='blue'
        aria-label='Settings'
        onClick={open}
      >
        <BiEdit size={14} />
      </ActionIcon>
    </div>
  );
};

export default EditAnswerButton;
