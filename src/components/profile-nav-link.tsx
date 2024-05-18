'use client';

import React, { useState, useEffect } from 'react';
// mantine import
import { NavLink } from '@mantine/core';
// component import
import ProfileAvatar from './profile-avatar';
// import { getCurrentUser } from '@/utils/supabase/auth/fetch';
// utils import
import { getCurrentUser } from '@/utils/supabase/auth';
import { fetchProfileByUserId } from '@/utils/supabase/profile';
// import { getCurrentUser } from '@/utils/supabase/auth/fetch';
// import { fetchProfileByUserId } from '@/utils/supabase/profile/fetch';
// next js import
import Link from 'next/link';

const ProfileNavLink = () => {
  // const currentUser = await getCurrentUser();
  // const profile = await fetchProfileByUserId(currentUser!.id);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

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

  return (
    // <div>Profile Nav Link</div>
    <NavLink
      label={profile?.name}
      component={Link}
      href='/profile'
      leftSection={<ProfileAvatar />}
    />
  );
};

export default ProfileNavLink;