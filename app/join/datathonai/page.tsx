"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoadingLayer from '@/components/summit/loading-layer';

export default function RedirectPage() {
  const router = useRouter();
  const joinUrl = process.env.NEXT_PUBLIC_LINK_DATATHONAI_JOIN_URL || 'https://ituai.club/';

  useEffect(() => {
    async function redirect() {
      await router.push(joinUrl);
    }
    redirect();
  }, [router]);

  return <LoadingLayer />;
}
