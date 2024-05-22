import React from 'react';
// component import
import ProfileCard from '@/components/profile/profile-card';
import Profiletabs from '@/components/profile/profile-tabs';

const ProfilePage = () => {
  return (
    <div className='min-h-screen'>
      <ProfileCard />
      <div className='mt-6'>
        <Profiletabs />
      </div>
    </div>
  );
};

export default ProfilePage;
