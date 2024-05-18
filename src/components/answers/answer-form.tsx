'use client';

import React, { useState } from 'react';
// mantine import
import { Button } from '@mantine/core';
import { RichTextEditor, Link } from '@mantine/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { notifications } from '@mantine/notifications';
// utils import
import { insertAnswer } from '@/utils/supabase/answers/actions';

const AnswerForm = ({ questionId, close }: { questionId: string; close: any }) => {
  const [content, setContent] = useState('' as string);
  const [contentError, setContentError] = useState('' as string);
  const [insertLoading, setInsertLoading] = useState(false);

  const editor = useEditor({
    extensions: [StarterKit, Link, Placeholder.configure({ placeholder: 'Enter your answer here' })],

    content: content,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const answerContent = editor?.getHTML();
      const answerContentText = editor?.getText();

      if (!answerContentText) {
        setContentError('Answer content is required');
        setInsertLoading(false);
        return;
      }

      setContentError('');

      setInsertLoading(true);

      await insertAnswer({
        question_id: questionId,
        content: answerContent,
      });

      setInsertLoading(false);

      close();

      notifications.show({
        title: 'Answer submitted',
        message: 'Your answer has been successfully submitted.',
        color: 'green',
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: 'An error occurred while submitting your answer. Please try again.',
        color: 'red',
      });

      console.log(error.message);

      setInsertLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p className='font-medium text-sm mb-2'>Your answer</p>
      <div className={`${contentError ? 'border border-red-600 rounded' : ''}`}>
        <RichTextEditor
          editor={editor}
          contentEditable={false}
        >
          <RichTextEditor.Toolbar
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
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content contentEditable={false} />
        </RichTextEditor>
      </div>
      {contentError && <p className='text-red-600 text-xs mt-1'>{contentError}</p>}

      <Button
        type='submit'
        className='mt-4'
        radius='md'
        loading={insertLoading}
      >
        Submit
      </Button>
    </form>
  );
};

export default AnswerForm;
