import React from 'react';

const QuestionDetailPage = ({ params }: { params: { id: string } }) => {
  return <div className='min-h-screen'>QuestionDetailPage {params.id}</div>;
};

export default QuestionDetailPage;
