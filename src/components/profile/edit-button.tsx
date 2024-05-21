'use client';

import React from 'react';
// matine import
import { Button, Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { BiEdit } from 'react-icons/bi';
// component import
import EditProfileForm from './edit-profile-form';

const EditButton = ({ profile }: { profile: any }) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Edit Profile'
        centered
        radius='md'
      >
        <EditProfileForm close={close} profile={profile} />
      </Modal>
      <Button
        radius='md'
        color='blue'
        leftSection={<BiEdit />}
        onClick={open}
      >
        Edit
      </Button>
    </>
  );
};

export default EditButton;
