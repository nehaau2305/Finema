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
  isAdmin: boolean;
  suspended: boolean;
}

interface UserCardProps {
  id: number;
  active: boolean;
  name: string;
  email: string;
  home_address: string;
  isAdmin: boolean;
  phone: string;
  suspended: boolean;
}

export default function ManageUsers() {
  const router = useRouter();
  const [token, setToken] = useToken('token');
  const [email, setEmail] = useState(''); // State for the email input
  const [message, setMessage] = useState(''); // State for success/error messages
  const [users, setUsers] = useState<UserCardProps[]>([]); // State for the list of users

  useEffect(() => {
    if (token === '') {
      router.push('/web-user-home');
    } else {
      // Fetch the list of users
      fetch('http://localhost:8080/users/all', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [router, token]);

  // Function to handle user actions
  const handleUserAction = async (action: 'suspend' | 'unsuspend' | 'makeAdmin' | 'removeAdmin') => {
    try {
      const response = await fetch(`http://localhost:8080/users/${action}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${action} user`);
      }

      const updatedUser = await response.json();
      console.log(`${action} successful for user:`, updatedUser);

      // Display success message
      setMessage(`User ${email} successfully ${action}ed.`);

      // Update the user list
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === updatedUser.email ? updatedUser : user
        )
      );
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
      setMessage(`Failed to ${action} user. Please try again.`);
    }
  };

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false} />
      </div>

      <section className={styles.main_body}>
        {/* User List Section */}
        <section className={styles.user_list}>
          <h2>User List</h2>
          <table className={styles.user_table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Suspended</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>{user.suspended ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* User Action Section */}
        <section className={styles.user_actions}>
          <h2>Manage User</h2>
          <input
            type="text"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.email_input}
          />
          <div className={styles.action_buttons}>
            <Button onClick={() => handleUserAction('suspend')}>Suspend</Button>
            <Button onClick={() => handleUserAction('unsuspend')}>Unsuspend</Button>
            <Button onClick={() => handleUserAction('makeAdmin')}>Make Admin</Button>
            <Button onClick={() => handleUserAction('removeAdmin')}>Remove Admin</Button>
          </div>
          {message && <p className={styles.message}>{message}</p>}
        </section>
      </section>
    </div>
  );
}