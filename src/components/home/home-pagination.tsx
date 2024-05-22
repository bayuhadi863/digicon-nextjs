'use client';

import React from 'react';
// mantine import
import { Pagination } from '@mantine/core';
// next js import
import { useRouter } from 'next/navigation';

const MyPagination = ({ length, pageNumber, url, query }: { length: number; pageNumber: number; url: string; query?: string }) => {
  const router = useRouter();

  return (
    <Pagination
      value={pageNumber}
      onChange={(value: number) => {
        router.push(`${url}?${query ? `query=${query}&` : ''}page=${value}`);
      }}
      total={length}
    />
  );
};

export default MyPagination;
