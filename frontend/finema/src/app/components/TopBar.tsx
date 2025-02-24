import React from 'react'
import { useRouter } from 'next/navigation'
import Button from './Button'
import styles from './TopBar.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

const TopBar = ({loggedIn = false, showEditProfile = true}:any) => { //will revist this :any later, possibly too optimistic about it
    const router = useRouter()
    console.log(loggedIn, showEditProfile)

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
    const loggedInUser = (
        <div className={styles.webUserTopBar}>
            <button onClick={goToHome}>
                <Image
                src={finemalogo}
                height={200}
                width={200}
                alt="finemalogo home button"
                /> 
            </button>
            <div>
                {(showEditProfile) ? <Button onClick={goToEditProfile}>Edit Profile</Button> : <></>}
            </div>
        </div>
    )
    const webUser = (
        <div className={styles.webUserTopBar}>
            <button onClick={goToHome}>
                <Image
                src={finemalogo}
                height={200}
                width={200}
                alt="finemalogo home button"
                /> 
            </button>
            <div>
                <Button onClick={goToLogin}>Log In</Button>
                <Button onClick={goToSignUp}>Sign Up</Button>
            </div>
        </div>
    )

    const currentUser = (loggedIn) ? loggedInUser : webUser;

    return currentUser
}

export default TopBar