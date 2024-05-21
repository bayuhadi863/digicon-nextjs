import React from 'react';
// mantine import
import { Avatar, Title, Text, Button } from '@mantine/core';
// image import
import UserImage from '/public/assets/images/user.png';
// utils import
import { getCurrentUser } from '@/utils/supabase/auth/fetch';
import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
// component import
import LogoutButton from './logout-button';
import EditButton from './edit-button';

const ProfileCard = async () => {
  const authUser = await getCurrentUser();
  const profile = await fetchProfileByUserId(authUser!.id);

  return (
    <div className='flex flex-col md:flex-row gap-6 justify-between'>
      <div className='flex items-center gap-6'>
        <Avatar
          src={profile.profile_picture ? profile.profile_picture : UserImage.src}
          alt='User'
          size={100}
        />
        <div>
          <Title className='mb-2'>{profile.name}</Title>
          <Text>@{profile.username}</Text>
        </div>
      </div>
      <div className='flex gap-2'>
        <EditButton profile={profile} />
        <LogoutButton />
      </div>
    </div>
  );
};

export default ProfileCard;
