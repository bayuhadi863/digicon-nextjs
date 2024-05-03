'use client';

import React, { useState, useEffect } from 'react';

// Lib / Utils
import { getUser } from '@/firebase/auth/getUser';
import signOutUser from '@/firebase/auth/signout';
import { createClient } from '@/utils/supabase/client';

// mantine import
import { AppShell, Burger, Group, Skeleton, Text, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';

// icons import
import { IoLogOutOutline } from 'react-icons/io5';

// next js import
import { useRouter } from 'next/navigation';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = getUser();

  const [opened, { toggle }] = useDisclosure();

  const [signOutLoading, setSignOutLoading] = useState(false);

  const router = useRouter();

  const handleSignOut = async () => {
    setSignOutLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      setSignOutLoading(false);
      notifications.show({
        title: 'Login Failed!',
        message: error.message,
        color: 'red',
      });
      return;
    }

    setSignOutLoading(false);
    notifications.show({
      title: 'Logout Success!',
      message: 'See you again!',
      color: 'green',
    });
    return router.push('/login');
  };

  return (
    <AppShell
      layout='alt'
      header={{ height: 60 }}
      footer={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      aside={{ width: 300, breakpoint: 'md', collapsed: { desktop: false, mobile: true } }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          px='md'
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom='sm'
            size='sm'
          />
          <Text>Logo</Text>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <div className='h-full flex flex-col justify-between'>
          <div>atas</div>
          <div>
            <NavLink
              label='Logout'
              component='button'
              onClick={handleSignOut}
              leftSection={<IoLogOutOutline size='1.2rem' />}
            />
          </div>
        </div>
      </AppShell.Navbar>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Aside p='md'>Aside</AppShell.Aside>
    </AppShell>
  );
};

export default HomeLayout;
