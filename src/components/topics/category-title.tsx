import React from 'react';

const CategoryTitle = ({ children }: { children: React.ReactNode }) => {
  return <h3 className='text-2xl font-semibold'>{children}</h3>;
};

export default CategoryTitle;
