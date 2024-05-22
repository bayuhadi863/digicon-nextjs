'use client';

import React, { useState, useEffect } from 'react';
// utils import
import { createClient } from '@/utils/supabase/client';
// libs import
import { Profile } from '@/libs/types/profile';
// mantine import
import { Avatar } from '@mantine/core';
// image import
import UserImage from '/public/assets/images/user.png';

const ProfileCard = () => {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const getProfile = async () => {
      const supabase = createClient();
      const { data: profiles, error } = await supabase.from('profiles').select('*').limit(1);
      if (error) {
        console.error(error);
        return;
      }
      setProfile(profiles[0] || null);
    };
    getProfile();
  }, []);

  console.log(profile);

  return (
    <div className='flex flex-col md:flex-row items-center gap-3'>
      <div className='flex justify-center'>
        <Avatar
          src={UserImage.src}
          alt='User'
          size={45}
        />
      </div>
      <div className='text-sm'>
        <p className='font-semibold'>{profile?.username}</p>
        <p>{profile?.name}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
