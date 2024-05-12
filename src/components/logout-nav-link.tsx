'use client';

import React, { useState } from 'react';
// mantine import
import { NavLink } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// icons import
import { IoLogOutOutline } from 'react-icons/io5';
// utils import
import { logoutUser } from '@/utils/supabase/auth';
// next js import
import { useRouter } from 'next/navigation';

const LogoutNavLink = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();

  const handleLogout = async () => {
    setLogoutLoading(true);

    await logoutUser();

    router.refresh();

    notifications.show({
      title: 'Logout Success!',
      message: 'You have been logged out successfully!',
      color: 'green',
    });

    setLogoutLoading(false);
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
