'use client';

import React, { useState, useEffect } from 'react';
// mantine import
import { Avatar, Menu, rem } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// image import
import UserImage from '/public/assets/images/user.png';
// utils import
import { getCurrentUser } from '@/utils/supabase/auth';
import { fetchProfileByUserId } from '@/utils/supabase/profile';
import { logoutUser } from '@/utils/supabase/auth';
// icons import
import { IoLogOutOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa6';
import { LuUser } from 'react-icons/lu';
// next js import
import { useRouter } from 'next/navigation';

const links = [
  {
    name: 'Profile',
    href: '/profile',
    icon: <LuUser size='1rem' />,
  },
];

const ProfileAvatar = () => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await getCurrentUser();
      setCurrentUser(user);
    };

    const fetchProfile = async () => {
      if (currentUser) {
        const profile = await fetchProfileByUserId(currentUser.id);
        setProfile(profile);
      }
    };

    setFetchLoading(true);

    fetchCurrentUser().then(() => {
      fetchProfile().then(() => {
        setFetchLoading(false);
      });
    });
  }, [currentUser, currentUser?.id]);

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
    <Menu>
      <Menu.Target>
        <Avatar
          src={UserImage.src}
          alt={`User's photo`}
          component='button'
        />
      </Menu.Target>

      <Menu.Dropdown>
        {links.map((link) => (
          <Menu.Item
            key={link.name}
            leftSection={link.icon}
          >
            {link.name}
          </Menu.Item>
        ))}

        <Menu.Divider />

        <Menu.Item
          color='red'
          component='button'
          leftSection={<IoLogOutOutline size='1rem' />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileAvatar;
