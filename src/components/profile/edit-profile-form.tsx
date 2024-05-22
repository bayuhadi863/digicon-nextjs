'use client';

import React, { useState } from 'react';
// mantine import
import { TextInput, FileInput, Box, LoadingOverlay, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
// utils import
import { updateProfile } from '@/utils/supabase/profile/actions';
import { uploadImage } from '@/utils/cloudinary/upload';
import { deleteImage } from '@/utils/cloudinary/delete';

interface FormValues {
  name: string;
  username: string;
  image: any;
}

const EditProfileForm = ({ close, profile }: { close: any; profile: any }) => {
  const [editLoading, setEditLoading] = useState(false);

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: profile.name,
      username: profile.username,
      image: null,
    },

    validate: {
      name: (value) => (value === '' ? 'Name is required' : value.length < 2 ? 'Too short name' : null),
      username: (value) => {
        if (value === '') return 'Username is required';
        if (value.length < 2) return 'Too short username';
        if (!/^[\w-]+$/.test(value)) return 'Username can only contain letters, numbers, hyphens (-), and underscores (_)';
        return null;
      },
      image: (value) => {
        if (value) {
          if (value.size > 1024 * 1024 * 2) {
            return 'Image size should be less than 1MB';
          }
          if (value.type !== 'image/png' && value.type !== 'image/jpeg' && value.type !== 'image/jpg') {
            return 'Image type should be png, jpeg or jpg';
          }
        }
      },
    },
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const { name, username, image } = form.getValues();

    if (form.isValid()) {
      try {
        setEditLoading(true);

        if (image) {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!);

          if (profile.profile_picture) {
            await deleteImage(profile.profile_picture);
          }

          const imageData = await uploadImage(formData);
          await updateProfile(
            {
              name: name,
              username: username,
              profile_picture: imageData.secure_url,
            },
            profile.id
          );
        } else {
          await updateProfile(
            {
              name: name,
              username: username,
            },
            profile.id
          );
        }

        // perform edit profile action
        setEditLoading(false);
        close();
        // show notification
        notifications.show({
          title: 'Profile updated successfully',
          message: 'Your profile has been updated successfully',
          color: 'green',
        });
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: 'An error occurred while updating your profile. Please try again',
          color: 'red',
        });

        console.error(error);

        setEditLoading(false);
      }
    }
  };

  return (
    <Box pos='relative'>
      <LoadingOverlay
        visible={editLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: 'pink', type: 'bars' }}
      />
      <form
        onSubmit={form.onSubmit((values, event) => {
          handleSubmit(event);
        })}
      >
        <TextInput
          label='Full Name'
          placeholder='Enter your full name'
          radius='md'
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label='Username'
          placeholder='Enter your username'
          radius='md'
          mt='md'
          key={form.key('username')}
          {...form.getInputProps('username')}
        />
        <FileInput
          label='Profile Picture'
          placeholder='Choose new profile picture'
          radius='md'
          mt='md'
          accept='image/png,image/jpeg,image/jpg'
          key={form.key('image')}
          {...form.getInputProps('image')}
        />
        <Button
          type='submit'
          className='mt-4'
          radius='md'
          // loading={editLoading}
        >
          Update
        </Button>
      </form>
    </Box>
  );
};

export default EditProfileForm;
