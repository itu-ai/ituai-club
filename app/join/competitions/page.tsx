"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingLayer from '@/components/summit/loading-layer';

export default function CompetitionsPage() {
  const router = useRouter();
  const joinUrl = process.env.NEXT_PUBLIC_LINK_COMPETITIONS_JOIN_URL || 'https://ituai.club/';

  useEffect(() => {
    async function redirect() {
      await router.push(joinUrl);
    }
    redirect();
  }, [router]);

  return <LoadingLayer />;
}
