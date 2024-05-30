import React, { Suspense } from 'react';
// component import
import ProfileCard from '@/components/profile/profile-card';
import Profiletabs from '@/components/profile/profile-tabs';
import ProfileCardSkeleton from '@/components/profile/profile-card-skeleton';
import ProfileTabsSkeleton from '@/components/profile/profile-tabs-skeleton';

const ProfilePage = () => {
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<ProfileCardSkeleton />}>
        <ProfileCard />
      </Suspense>

      <div className='mt-6'>
        <Suspense fallback={<ProfileTabsSkeleton />}>
          <Profiletabs />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
