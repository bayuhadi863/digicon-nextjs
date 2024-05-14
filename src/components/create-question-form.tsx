'use client';

import React, { useEffect, useState } from 'react';
// mantine import
import { useForm } from '@mantine/form';
import { Button, TextInput, Select, Box, LoadingOverlay } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { notifications } from '@mantine/notifications';
// utils import
import { fetchTopicsForSelect } from '@/utils/supabase/topic';
import { insertQuestion } from '@/utils/supabase/question';
// css
import classes from '@/styles/text-editor.module.css';

const CreateQuestionForm = () => {
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

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      topic: '',
    },

    validate: {
      topic: (value) => (value ? null : 'Topic is required'),
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

      const topic = form.getValues().topic;
      const questionContent = editor?.getHTML();
      const questionContentText = editor?.getText();

      if (!questionContentText) {
        setContentError('Question content is required');
        return;
      }

      // insert question
      const question = await insertQuestion({
        topic_id: topic,
        content: questionContent,
      });

      // show notification
      notifications.show({
        title: 'Question created',
        message: 'Question has been created successfully',
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
          />
        )}

        <div className='mt-4'>
          <label className='font-medium text-sm'>Question Content</label>
          <div className={`${contentError ? 'border border-red-600 rounded' : ''}`}>
            <RichTextEditor
              editor={editor}
            >
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

              <RichTextEditor.Content h={100} />
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
