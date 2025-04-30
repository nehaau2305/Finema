'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import styles from './ManageUsers.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';

interface User {
  id: number;
  name: string;
  email: string; 
}

interface UserCardProps {
  id: number;
  active: boolean;
  name: string;
  email: string;
  home_address: string;
  is_admin: boolean;
  phone: string;
  suspended: boolean;
}

export default function ManageUsers() {

  const router = useRouter()
  const [token, setToken] = useToken('token');

  const [users, setUsers] = useState<User[]>([]);


  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home');
    } else {

      fetch('http://localhost:8080/users/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        console.log('this is full response: ', response)
        if (!response.ok) {
          throw new Error('Failed to fetch users')
        }
        return response.json()
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching user data:', error));
      }
    }, [router, token]);


  function foo() {
    console.log('PHEW!')
  }

  return (
    <div>
    <div className={styles.top}>
      <TopBar loggedIn={true} showEditProfile={false}/>
    </div>

    <section className={styles.main_body}>
            <section className={styles.users}>
            <p> Current Users: </p>
              <ul>
                {users.length > 0 ? (
                  users.map((user: User) => (
                      <li key={user.id}>
                        <p> {user.name}: {user.email} </p>
                      </li>
                    ))
                ) : (
              <p>No results found</p>
              )}
              </ul>
            </section>
          </section>
      </div>

  );
};