import React from 'react';

const PageTitle = ({ children }: { children: React.ReactNode }) => {
  return <h1 className='text-3xl lg:text-4xl font-semibold'>{children}</h1>;
};

export default PageTitle;
