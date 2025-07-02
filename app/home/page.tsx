'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HomeBody from '../home/components/HomeBody';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userId = localStorage.getItem('userId');
    if (isLoggedIn !== 'true' || !userId) {
      router.push('/login');
    }
  }, [router]);

  return <HomeBody />;
}
