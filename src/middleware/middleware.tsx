'use client';

import React, { useEffect } from 'react';
import { useAuthContext } from '@/context/auth-context';
import { useRouter, usePathname } from 'next/navigation';

const Middleware = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if ((pathname === '/login' || pathname === '/register') && user) {
      router.push('/');
      return;
    }
    if (pathname === '/register' && !user) {
      return;
    }
    if (pathname === '/login' && !user) {
      return;
    }
    if (!user) {
      router.push('/login');
    }
  }, [user, router, pathname]);

  console.log('Middleware:', user);

  return <div>{children}</div>;
};

export default Middleware;
