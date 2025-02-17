import React from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import styles from './TopBar.module.css'

const TopBar = (
    {
        loggedIn,
        showEditProfile = true
    }:
    {
        loggedIn:boolean,
        showEditProfile:boolean
    }
) => {
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

    function goToEditProfile() {
        router.push('/edit-profile')
    }
    let loggedInUser = (
        <div className={styles.webUserTopBar}>
            <Button onClick={goToHome}>Home</Button>
            <div>
                {(showEditProfile) ? <Button onClick={goToEditProfile}>Edit Profile</Button> : <></>}
            </div>
        </div>
    )
    let webUser = (
        <div className={styles.webUserTopBar}>
            <Button onClick={goToHome}>Home</Button>
            <div>
                <Button onClick={goToLogin}>Log In</Button>
                <Button onClick={goToSignUp}>Sign Up</Button>
            </div>
        </div>
    )

    let currentUser = (loggedIn) ? loggedInUser : webUser;

    return currentUser
}


export default TopBar