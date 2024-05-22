import React, { Suspense } from 'react';
// component import
import ProfileCard from '@/components/profile/profile-card';
import Profiletabs from '@/components/profile/profile-tabs';

const ProfilePage = () => {
  return (
    <div className='min-h-screen'>
      <Suspense fallback={<p>Loading...</p>}>
        <ProfileCard />
      </Suspense>
      <div className='mt-6'>
        <Suspense fallback={<p>Loading...</p>}>
          <Profiletabs />
        </Suspense>
      </div>
    </div>
  );
};

export default ProfilePage;
