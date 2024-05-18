'use client';

import React from 'react';
import { Button, Modal, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { IoMdAddCircleOutline } from 'react-icons/io';
// components import
import AnswerForm from './answer-form';

const AnswerModal = ({ questionId }: { questionId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Answer Question'
        size='xl'
        centered
        radius='md'
      >
        <AnswerForm questionId={questionId} close={close} />
      </Modal>
      <Button
        radius='md'
        onClick={open}
        leftSection={<IoMdAddCircleOutline size='1rem' />}
        className='hidden md:block'
      >
        Answer
      </Button>
    </>
  );
};

export default AnswerModal;
