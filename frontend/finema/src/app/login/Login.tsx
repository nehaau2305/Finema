'use client'
import React from 'react';
import { useRouter } from 'next/navigation'
import Button from '../components/Button'

export default function Login() {
  const router = useRouter()
  
  const handleSignUp = () => {
    router.push('/registration')
  }
  const handleLogIn = () => {
    router.push('/loggedin-user-home')
  }
  return (
    <div>
        <p>Log In page</p>
        <Button onClick={handleSignUp}>Sign Up</Button>
        <Button onClick={handleLogIn}>Log In</Button>
    </div>
  );
};

