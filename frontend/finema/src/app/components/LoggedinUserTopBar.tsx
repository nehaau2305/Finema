import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './LoggedinUserTopBar.module.css'

export default function LoggedinUserTopBar() {
    const router = useRouter()

    function goToHome() {
        router.push('/')
    }

    function goToEditProfile() {
        router.push('/edit-profile')
    }

    return (
        <div className={styles.loggedinUserTopBar}>
            <Button onClick={goToHome}>Home</Button>
            <div>
                <Button onClick={goToEditProfile}>Edit Profile</Button>
            </div>
        </div>
    )
}
