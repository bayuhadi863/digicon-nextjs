'use client';

import React, { useState, useEffect } from 'react';
// icons import
import { BiLike, BiSolidLike } from 'react-icons/bi';
// mantine import
import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
// utils import
import { insertAnswerLike, deleteAnswerLike } from '@/utils/supabase/answers/actions';

const LikeAnswerButton = ({ answerId, userAnswerLikes }: { answerId: string; userAnswerLikes: any }) => {
  const [likeLoading, setLikeLoading] = useState(false);

  const handleLike = async () => {
    try {
      setLikeLoading(true);
      await insertAnswerLike({
        answer_id: answerId,
      });
      setLikeLoading(false);
      notifications.show({
        title: 'Berhasil!',
        message: 'Berhasil memberikan like.',
        color: 'green',
      });
    } catch (error) {
      setLikeLoading(false);
      notifications.show({
        title: 'Gagal!',
        message: 'Gagal memberikan like.',
        color: 'red',
      });
    }
  };

  const handleDeleteLike = async (answerLikeId: string) => {
    try {
      setLikeLoading(true);
      await deleteAnswerLike(answerLikeId);
      setLikeLoading(false);
      notifications.show({
        title: 'Berhasil!',
        message: 'Berhasil menghapus like.',
        color: 'green',
      });
    } catch (error) {
      setLikeLoading(false);
      notifications.show({
        title: 'Gagal!',
        message: 'Gagal menghapus like.',
        color: 'red',
      });
    }
  };

  return (
    <>
      {userAnswerLikes.length > 0 ? (
        <ActionIcon
          variant='filled'
          size='sm'
          aria-label='Like'
          onClick={() => handleDeleteLike(userAnswerLikes[0].id)}
          loading={likeLoading}
        >
          <BiSolidLike size={14} />
        </ActionIcon>
      ) : (
        <ActionIcon
          variant='outline'
          size='sm'
          aria-label='Like'
          onClick={handleLike}
          loading={likeLoading}
        >
          <BiLike size={14} />
        </ActionIcon>
      )}
    </>
  );
};

export default LikeAnswerButton;
