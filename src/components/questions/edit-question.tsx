'use client';

import React from 'react';
// mantine import
import { ActionIcon, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { BiEdit } from 'react-icons/bi';
// component import
import EditQuestionForm from './edit-question-form';

const EditQuestion = ({ question }: { question: any }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Edit Question'
        size='xl'
        centered
        radius='md'
      >
        {/* <CreateQuestionForm close={close} /> */}
        <EditQuestionForm
          close={close}
          question={question}
        />
      </Modal>
      <ActionIcon
        variant='outline'
        color='blue'
        aria-label='Edit'
        onClick={open}
      >
        <BiEdit />
      </ActionIcon>
    </div>
  );
};

export default EditQuestion;
