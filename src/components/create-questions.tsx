'use client';

import React, { useEffect, useState } from 'react';
// mantine import
import { Button, Modal, ActionIcon, Skeleton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
// icons import
import { IoMdAddCircleOutline } from 'react-icons/io';
// components import
import CreateQuestionForm from '@/components/create-question-form';
// utils import
import { fetchTopicsForSelect } from '@/utils/supabase/topic';

const CreateQuestion = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [topicsData, setTopicsData] = useState<any>([]);
  const [fetchLoading, setFetchLoading] = useState(false);

  useEffect(() => {
    const fetchTopics = async () => {
      setFetchLoading(true);
      const topics = await fetchTopicsForSelect();
      setTopicsData(topics);
      setFetchLoading(false);
    };

    fetchTopics();
  }, []);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title='Create Question'
        size='xl'
        centered
        radius='md'
      >
        <CreateQuestionForm
          close={close}
          topicsData={topicsData}
        />
      </Modal>

      {/* {fetchLoading ? (
        <div>Loading...</div>
      ) : ( */}
      <Skeleton visible={fetchLoading}>
        <Button
          size='md'
          radius='md'
          onClick={open}
          leftSection={<IoMdAddCircleOutline size='1.1rem' />}
          className='hidden md:block'
        >
          Question
        </Button>

        <ActionIcon
          variant='filled'
          radius='md'
          size='42'
          onClick={open}
          className='block md:hidden'
        >
          <IoMdAddCircleOutline size='25' />
        </ActionIcon>
      </Skeleton>
      {/* )} */}
    </>
  );
};

export default CreateQuestion;
