'use client';

import React, { useState, useEffect } from 'react';

// Lib / Utils
import { createClient } from '@/utils/supabase/client';

// mantine import
import { AppShell, Burger, Group, Text, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
// icons import
import { IoLogOutOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
import { MdOutlineTopic } from 'react-icons/md';
// next js import
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// component import
import ProfileCard from '@/components/home/profile-card';
import CreateButton from '@/components/home/create-button';
import Footer from '@/components/footer';
import ProfileAvatar from '@/components/profile-avatar';
import ThemeSwitch from '@/components/theme-switch';

// Sidebar links
const sidebarLinks = [
  {
    name: 'Home',
    href: '/',
    icon: <GoHome />,
  },
  {
    name: 'Topics',
    href: '/topics',
    icon: <MdOutlineTopic />,
  },
];

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='md'
    >
      <AppShell.Header withBorder={false}>
        <Group
          h='100%'
          px='md'
        >
          <div className='w-full flex justify-between items-center'>
            <div>
              <Group h='100%'>
                <Burger
                  opened={mobileOpened}
                  onClick={toggleMobile}
                  hiddenFrom='sm'
                  size='sm'
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom='sm'
                  size='sm'
                />
                <h3 className='text-primary text-3xl font-bold'>Digicon</h3>
              </Group>
            </div>
            <div className='flex gap-4'>
              <ThemeSwitch />
              <ProfileAvatar />
            </div>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p='md'
        withBorder={false}
      >
        <div className='h-full flex flex-col justify-between'>
          <div>
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.name}
                label={link.name}
                component={Link}
                href={link.href}
                leftSection={link.icon}
              />
            ))}
          </div>
          <div></div>
        </div>
      </AppShell.Navbar>
      <AppShell.Main>
        {children}
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
};

export default HomeLayout;
