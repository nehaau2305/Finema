'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'

export default function Registration() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/registration-confirmation')
  }
  return (
    <div>
        <p>Registration page</p>
        <Button onClick={handleClick}>Create Account</Button>
    </div>
  );
};
