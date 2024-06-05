'use client';

import React, { useState } from 'react';
// mantine import
import { ActionIcon, Text, Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
// icons import
import { IoTrashOutline } from 'react-icons/io5';
// utils import
import { deleteQuestion } from '@/utils/supabase/questions/actions';
import { deleteImage } from '@/utils/cloudinary/delete';

const DeleteQuestion = ({ question }: { question: any }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      if (question.image_url != null || question.image_url != '') {
        await deleteImage(question.image_url);
      }

      await deleteQuestion(question.id);

      setDeleteLoading(false);

      close();

      notifications.show({
        title: 'Question successfully deleted',
        message: 'Your question has been successfully deleted.',
        color: 'green',
      });
    } catch (error) {
      setDeleteLoading(false);

      close();

      notifications.show({
        title: 'Error',
        message: 'An error occurred while deleting your question.',
        color: 'red',
      });
    }
  };

  return (
    <div>
      <Modal
        opened={opened}
        onClose={close}
        title='Delete Question'
        centered
        radius='md'
      >
        <Text size='sm'>Are you sure you want to delete your question? Your question will be permanently deleted.</Text>
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
      <ActionIcon
        variant='outline'
        color='red'
        aria-label='Delete'
        onClick={open}
      >
        <IoTrashOutline />
      </ActionIcon>
    </div>
  );
};

export default DeleteQuestion;
