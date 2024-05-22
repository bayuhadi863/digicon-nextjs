'use client';

import React, { useState, useEffect } from 'react';

// Lib / Utils
import { createClient } from '@/utils/supabase/client';

// mantine import
import { AppShell, Burger, Group, Text, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
// icons import
import { RiQuestionnaireLine } from 'react-icons/ri';
import { GoHome } from 'react-icons/go';
import { MdOutlineTopic } from 'react-icons/md';
// next js import
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
// component import
import ProfileCard from '@/components/home/profile-card';
import CreateButton from '@/components/home/create-button';
import Footer from '@/components/footer';
import ProfileAvatar from '@/components/profile-avatar';
import ThemeSwitch from '@/components/theme-switch';
import CreateQuestion from '@/components/create-questions';
import ProfileNavLink from '@/components/profile-nav-link';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = (route: string) => {
    router.push(route);
    toggleMobile();
  };

  // Sidebar links
  const sidebarLinks = [
    {
      name: 'Home',
      href: '/',
      icon: <GoHome />,
      isActive: pathname === '/',
    },
    {
      name: 'Topics',
      href: '/topics',
      icon: <MdOutlineTopic />,
      isActive: pathname.startsWith('/topics'),
    },
    {
      name: 'Questions',
      href: '/questions',
      icon: <RiQuestionnaireLine />,
      isActive: pathname.startsWith('/questions'),
    },
  ];

  return (
    <AppShell
      header={{ height: 70 }}
      navbar={{
        width: 270,
        breakpoint: 'md',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding='lg'
    >
      <AppShell.Header withBorder={true}>
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
                  hiddenFrom='md'
                  size='sm'
                />
                <Burger
                  opened={desktopOpened}
                  onClick={toggleDesktop}
                  visibleFrom='md'
                  size='sm'
                />
                <h3 className='text-primary text-3xl font-bold'>Digicon</h3>
              </Group>
            </div>
            <div className='flex gap-4'>
              <ThemeSwitch />
              <CreateQuestion />
            </div>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        py='md'
        withBorder={false}
      >
        <div className='h-screen flex flex-col justify-between'>
          <div>
            {sidebarLinks.map((link) => (
              <>
                <div className='block lg:hidden'>
                  <NavLink
                    key={link.name}
                    label={link.name}
                    component='button'
                    // component={Link}
                    // href={link.href}
                    leftSection={link.icon}
                    px='lg'
                    active={pathname === link.href}
                    onClick={() => handleLinkClick(link.href)}
                  />
                </div>
                <div className='hidden lg:block'>
                  <NavLink
                    key={link.name}
                    label={link.name}
                    component={Link}
                    href={link.href}
                    leftSection={link.icon}
                    px='lg'
                    active={link.isActive}
                  />
                </div>
              </>
            ))}
          </div>
          <div>
            <ProfileNavLink toggleMobile={toggleMobile} />
          </div>
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
