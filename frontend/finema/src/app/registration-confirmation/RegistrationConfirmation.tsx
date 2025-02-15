'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'

export default function RegistrationConfirmation() {
  const router = useRouter()
  
  const handleClick = () => {
    router.push('/login')
  }
  return (
    <div>
        <p>Registration confirmed. Your account has been made!
        </p>
        <Button onClick={handleClick}>Log In</Button>
    </div>
  );
};