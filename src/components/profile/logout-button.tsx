'use client';

import React, { useState } from 'react';
// matine import
import { Button, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
// icons import
import { IoLogOutOutline } from 'react-icons/io5';
// utils import
import { logoutUser } from '@/utils/supabase/auth/actions';

const LogoutButton = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await logoutUser();

      notifications.show({
        title: 'Logout Success!',
        message: 'You have been logged out successfully!',
        color: 'green',
      });

      setLogoutLoading(false);
    } catch (error: any) {
      notifications.show({
        title: 'Logout Error!',
        message: error.message,
        color: 'red',
      });
      setLogoutLoading(false);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Logout Comfirmation'
        centered
        radius='md'
      >
        <Text size='sm'>Are you sure you want to log out of the application? You must log in again to return to the application.</Text>
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
            onClick={handleLogout}
            loading={logoutLoading}
          >
            Logout
          </Button>
        </div>
      </Modal>
      <Button
        radius='md'
        color='red'
        leftSection={<IoLogOutOutline />}
        onClick={open}
      >
        Logout
      </Button>
    </>
  );
};

export default LogoutButton;
