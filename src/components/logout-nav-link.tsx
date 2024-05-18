'use client';

import React, { useState } from 'react';
// mantine import
import { NavLink } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// icons import
import { IoLogOutOutline } from 'react-icons/io5';
// utils import
import { logoutUser } from '@/utils/supabase/auth/actions';
// next js import

const LogoutNavLink = () => {
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
    <NavLink
      label='Logout'
      color='red'
      component='button'
      leftSection={<IoLogOutOutline size='1.2rem' />}
      onClick={handleLogout}
    />
  );
};

export default LogoutNavLink;
