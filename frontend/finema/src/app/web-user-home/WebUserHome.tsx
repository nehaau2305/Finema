'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import WebUserTopBar from '../components/WebUserTopBar'

export default function WebUserHome() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <div>
      <WebUserTopBar />
        <p>Web User Home</p>
    </div>
  );
};

