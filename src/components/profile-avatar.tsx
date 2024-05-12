'use client';

import React from 'react';
// mantine import
import { Avatar } from '@mantine/core';
// image import
import UserImage from '/public/assets/images/user.png';
// icon import
import { LuUser } from 'react-icons/lu';

const links = [
  {
    name: 'Profile',
    href: '/profile',
    icon: <LuUser size='1rem' />,
  },
];

const ProfileAvatar = () => {
  return (
    <Avatar
      src={UserImage.src}
      alt={`User's photo`}
      size='35'
    />
  );
};

export default ProfileAvatar;
