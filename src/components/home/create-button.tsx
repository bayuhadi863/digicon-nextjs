'use client';

import React, { useState } from 'react';
// mantine import
import { Button, Menu, rem, TextInput, Text, FileInput, Box, LoadingOverlay } from '@mantine/core';
import { modals } from '@mantine/modals';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
// icons import
import { FaRegSquarePlus } from 'react-icons/fa6';
import { FaRegFileImage } from 'react-icons/fa';
import { MdOutlineTopic, MdPostAdd } from 'react-icons/md';
// next js import
// component import
// utils import
import { createClient } from '@/utils/supabase/client';
import { uploadImage } from '@/utils/cloudinary/upload';
import { insertTopic } from '@/utils/supabase/topic';

interface FormValues {
  name: string;
  image: any;
}

const CreateButton = () => {
  const [loading, setLoading] = useState(false);

  const topicForm = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      image: null,
    },
  });

  const handleTopicForm = async () => {
    try {
      // loading start
      setLoading(true);
      const name = topicForm.getValues().name;
      const image = topicForm.getValues().image;

      if (name === '') {
        notifications.show({
          title: 'Error!',
          message: 'Topic name is required.',
          color: 'red',
        });
        return;
      }

      if (image) {
        if (image.type !== 'image/png' && image.type !== 'image/jpeg' && image.type !== 'image/jpg') {
          notifications.show({
            title: 'Error!',
            message: 'Invalid image type. Only PNG, JPEG, and JPG are allowed.',
            color: 'red',
          });
          return;
        }

        if (image.size > 1024 * 1024 * 1) {
          notifications.show({
            title: 'Error!',
            message: 'Image size is too large. Maximum size is 1MB.',
            color: 'red',
          });
          return;
        }
      }

      // const formData = new FormData();
      // formData.append('file', image);
      // formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!);

      // // Mendapatkan data respons
      // const imageData = await uploadImage(formData);

      // console.log(imageData);

      // const topicData = await insertTopic({
      //   name,
      //   image_url: imageData.secure_url,
      // });

      // notifications.show({
      //   title: 'Create Success!',
      //   message: 'Topic has been created successfully.',
      //   color: 'green',
      // });

      // handleCloseModal();

      // loading end
      // setLoading(false);
    } catch (e: any) {
      console.error(e);

      notifications.show({
        title: 'Error!',
        message: e.message,
        color: 'red',
      });

      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    modals.closeAll();
    topicForm.setValues({
      name: '',
      image: null,
    });
  };

  const openTopicForm = () =>
    modals.open({
      title: 'Create New Topic',
      onClose: handleCloseModal,
      centered: true,
      children: (
        <Box pos='relative'>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: 'sm', blur: 2 }}
          />

          <form onSubmit={topicForm.onSubmit(handleTopicForm)}>
            <TextInput
              label='Topic name'
              placeholder='Enter topic name'
              key={topicForm.key('name')}
              {...topicForm.getInputProps('name')}
            />
            <FileInput
              label='Topic image (Max 1MB)'
              placeholder='Choose image'
              accept='image/png,image/jpeg,image/jpg'
              clearable
              leftSection={<FaRegFileImage />}
              mt='md'
              key={topicForm.key('image')}
              {...topicForm.getInputProps('image')}
            />

            <Button
              fullWidth
              type='submit'
              mt='md'
            >
              Create
            </Button>
          </form>
        </Box>
      ),
    });

  return (
    <Menu>
      <Menu.Target>
        <Button
          size='md'
          leftSection={<FaRegSquarePlus />}
        >
          Buat
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<MdOutlineTopic size={16} />}
          component='button'
          onClick={openTopicForm}
        >
          Topik
        </Menu.Item>
        <Menu.Item leftSection={<MdPostAdd size={16} />}>Postingan</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default CreateButton;
