import React from 'react';
// mantine import
import { Tabs, TabsList, TabsTab, TabsPanel } from '@mantine/core';
// components import
import UserQuestionsList from './user-questions-list';
import UserAnswersList from './user-answers-list';
import FollowedTopicsList from './followed-topics-list';
// utils import
import { getCurrentUser } from '@/utils/supabase/auth/fetch';

const Profiletabs = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Tabs defaultValue='questions'>
      <TabsList>
        <TabsTab value='questions'>Questions</TabsTab>
        <TabsTab value='answers'>Answers</TabsTab>
        <TabsTab value='followedTopics'>Topics</TabsTab>
      </TabsList>

      <TabsPanel value='questions'>
        <div className='mt-4'>
          <UserQuestionsList userId={currentUser!.id} />
        </div>
      </TabsPanel>

      <TabsPanel value='answers'>
        <div className='mt-4'>
          <UserAnswersList userId={currentUser!.id} />
        </div>
      </TabsPanel>

      <TabsPanel value='followedTopics'>
        <div className='mt-4'>
          <FollowedTopicsList userId={currentUser!.id} />
        </div>
      </TabsPanel>
    </Tabs>
  );
};

export default Profiletabs;
