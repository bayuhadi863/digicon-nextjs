'use client';

import React, { useEffect, useState } from 'react';
// mantine import
import { useForm } from '@mantine/form';
import { Button, TextInput, FileInput, Select, Box, LoadingOverlay } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { notifications } from '@mantine/notifications';
// utils import
import { fetchTopicsForSelect } from '@/utils/supabase/topic';
import { insertQuestion } from '@/utils/supabase/question';
import { uploadImage } from '@/utils/cloudinary/upload';
import { insertQuestionData } from '@/utils/supabase/questions/actions';
// css
import classes from '@/styles/text-editor.module.css';
// icons import
import { FaRegFileImage } from 'react-icons/fa';

interface FormValues {
  title: string;
  topic: string;
  image: any;
}

const CreateQuestionForm = ({ close }: { close: any }) => {
  const [topicsData, setTopicsData] = useState<any>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      const topics = await fetchTopicsForSelect();

      setTopicsData(topics);
    };

    setFetchLoading(true);
    fetchTopics().then(() => {
      setFetchLoading(false);
    });
  }, []);

  const [content, setContent] = useState('' as string);
  const [contentError, setContentError] = useState('' as string);
  const [insertLoading, setInsertLoading] = useState(false);

  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: {
      title: '',
      topic: '',
      image: null,
    },

    validate: {
      title: (value) => (value ? null : 'Title is required'),
      topic: (value) => (value ? null : 'Topic is required'),
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

  const editor = useEditor({
    extensions: [StarterKit, Link, Placeholder.configure({ placeholder: 'Enter your question here' })],

    content: content,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // insert loading
      setInsertLoading(true);

      const title = form.getValues().title;
      const topic = form.getValues().topic;
      const image = form.getValues().image;
      const questionContent = editor?.getHTML();
      const questionContentText = editor?.getText();

      if (!questionContentText) {
        setContentError('Question content is required');
        setInsertLoading(false);
        return;
      }

      // upload image
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET_NAME!);

        const imageData = await uploadImage(formData);
        await insertQuestionData(topic, title, questionContent!, imageData.secure_url);
      } else {
        await insertQuestionData(topic, title, questionContent!, null);
      }

      // close modal
      close();

      // show notification
      notifications.show({
        title: 'Question created successfully',
        message: 'Your question has been created successfully',
        color: 'green',
      });

      setInsertLoading(false);
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });

      setInsertLoading(false);
    }
  };

  return (
    <Box pos='relative'>
      <LoadingOverlay
        visible={insertLoading}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
      />
      <form
        onSubmit={form.onSubmit((values, event) => {
          handleSubmit(event);
        })}
      >
        <TextInput
          label='Title'
          placeholder='Write your question title'
          radius='md'
          key={form.key('title')}
          {...form.getInputProps('title')}
        />
        {fetchLoading ? (
          <p>Loading...</p>
        ) : (
          <Select
            label='Topic'
            placeholder='Choose topic'
            data={topicsData}
            key={form.key('topic')}
            {...form.getInputProps('topic')}
            searchable
            radius='md'
            mt='md'
          />
        )}

        <FileInput
          label='Image (optional)'
          placeholder='Choose image'
          accept='image/png,image/jpeg,image/jpg'
          clearable
          leftSection={<FaRegFileImage />}
          mt='md'
          radius='md'
          key={form.key('image')}
          {...form.getInputProps('image')}
        />

        <div className='mt-4'>
          <label className='font-medium text-sm'>Question Content</label>
          <div className={`${contentError ? 'border border-red-600 rounded' : ''}`}>
            <RichTextEditor editor={editor}>
              {/* <RichTextEditor.Toolbar
                sticky
                stickyOffset={60}
              >
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar> */}

              <RichTextEditor.Content />
            </RichTextEditor>
          </div>
          {contentError && <p className='text-red-600 text-xs mt-1'>{contentError}</p>}
        </div>

        <Button
          type='submit'
          className='mt-4'
          radius='md'
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default CreateQuestionForm;
