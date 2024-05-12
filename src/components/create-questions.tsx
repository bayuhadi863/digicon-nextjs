'use client';

import React from 'react';
// mantine import
import { Button, Modal, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { IoMdAddCircleOutline } from 'react-icons/io';
// components import
import CreateQuestionForm from '@/components/create-question-form';

const CreateQuestion = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Authentication'
      >
        <CreateQuestionForm />
      </Modal>

      <Button
        size='md'
        radius='md'
        onClick={open}
        leftSection={<IoMdAddCircleOutline size='1.1rem' />}
        className='hidden md:block'
      >
        Question
      </Button>

      <ActionIcon
        variant='filled'
        radius='md'
        size='42'
        onClick={open}
        className='block md:hidden'
      >
        <IoMdAddCircleOutline size='25' />
      </ActionIcon>
    </>
  );
};

export default CreateQuestion;
