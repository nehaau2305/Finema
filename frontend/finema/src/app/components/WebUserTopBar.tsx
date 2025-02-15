import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'
import styles from './WebUserTopBar.module.css'

const WebUserTopBar = () => {
    const router = useRouter()

    function goToHome() {
        router.push('/')
    }

    function goToLogin() {
        router.push('/login')
    }

    function goToSignUp() {
        router.push('/registration')
    }

    return (
        <div className={styles.webUserTopBar}>
            <Button onClick={goToHome}>Home</Button>
            <div>
                <Button onClick={goToLogin}>Log In</Button>
                <Button onClick={goToSignUp}>Sign Up</Button>
            </div>
        </div>
    )
}

export default WebUserTopBar