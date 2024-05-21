import React from 'react';
// mantine import
import { Box } from '@mantine/core';

const QuestionContent = ({ content }: { content: string }) => {
  return (
    <>
      <Box darkHidden>
        <div
          className='prose prose-sm prose-code:text-sm break-all whitespace-normal'
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </Box>
      <Box lightHidden>
        <div
          className='prose prose-invert prose-sm prose-code:text-sm break-all whitespace-normal'
          dangerouslySetInnerHTML={{ __html: content }}
        ></div>
      </Box>
    </>
  );
};

export default QuestionContent;
