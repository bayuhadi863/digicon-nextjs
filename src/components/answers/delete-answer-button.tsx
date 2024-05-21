'use client';

import React, { useState } from 'react';
// mantine import
import { ActionIcon, Modal, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
// icons import
import { IoTrashOutline } from 'react-icons/io5';
// utils import
import { deleteAnswer } from '@/utils/supabase/answers/actions';

const DeleteAnswerButton = ({ answerId }: { answerId: string }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await deleteAnswer(answerId);

      setDeleteLoading(false);

      close();

      notifications.show({
        title: 'Answer successfully deleted',
        message: 'Your answer has been successfully deleted.',
        color: 'green',
      });
    } catch (error) {
      setDeleteLoading(false);

      close();

      notifications.show({
        title: 'Error',
        message: 'An error occurred while deleting your answer.',
        color: 'red',
      });
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Delete Answer'
        centered
        radius='md'
      >
        <Text size='sm'>Are you sure you want to delete your answer? Your answer will be permanently deleted.</Text>
        <div className='flex justify-end gap-3 mt-4'>
          <Button
            variant='default'
            onClick={close}
            radius='md'
          >
            Cancel
          </Button>
          <Button
            variant='filled'
            color='red'
            radius='md'
            onClick={handleDelete}
            loading={deleteLoading}
          >
            Delete
          </Button>
        </div>
      </Modal>
      <button onClick={open}>
        <IoTrashOutline className='text-red-300 hover:text-red-400' />
      </button>
    </div>
  );
};

export default DeleteAnswerButton;
