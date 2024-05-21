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
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const ProfileNavLink = ({ toggleMobile }: { toggleMobile: any }) => {
  // const currentUser = await getCurrentUser();
  // const profile = await fetchProfileByUserId(currentUser!.id);

  const [currentUser, setCurrentUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [fetchLoading, setFetchLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleLinkClick = () => {
    router.push('profile');
    toggleMobile();
  };

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
    <>
      <div className='block lg:hidden'>
        <NavLink
          label={profile?.name}
          component='button'
          leftSection={<ProfileAvatar profile={profile} />}
          px='lg'
          active={pathname === '/profile'}
          onClick={handleLinkClick}
        />
      </div>
      <div className='hidden lg:block'>
        <NavLink
          label={profile?.name}
          component={Link}
          href='/profile'
          leftSection={<ProfileAvatar profile={profile} />}
          px='lg'
          active={pathname === '/profile'}
        />
      </div>
    </>
  );
};

export default ProfileNavLink;
