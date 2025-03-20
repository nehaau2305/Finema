import React from 'react'
import { useRouter } from 'next/navigation'
import { useToken } from '../components/useToken'
import Button from './Button'
import styles from './TopBar.module.css'
import Image from 'next/image'
import finemalogo from './finemalogo.png'

const TopBar = ({loggedIn = false, showEditProfile = true}:any) => { //will revist this :any later, possibly too optimistic about it
    const router = useRouter()
    const [token, setToken] = useToken();

    function goToWebUserHome() {
        setToken(null)
        router.push('/web-user-home')
    }

    function goToLoggedInHome() {
        router.push('/loggedin-user-home')
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
            <button onClick={goToLoggedInHome}>
                <Image
                src={finemalogo}
                height={200}
                width={200}
                alt="finemalogo home button"
                /> 
            </button>
            <div className={styles.buttons}>
            <div>
                {(showEditProfile) ? <Button onClick={goToEditProfile}>Edit Profile</Button> : <></>}
            </div>
            <div>
                <Button onClick={goToWebUserHome}>Log Out</Button>
            </div>
            </div>
        </div>
    )
    const webUser = (
        <div className={styles.webUserTopBar}>
            <button onClick={goToWebUserHome}>
                <Image
                src={finemalogo}
                height={200}
                width={200}
                alt="finemalogo home button"
                /> 
            </button>
            <div className={styles.buttons}>
                <div>
                    <Button onClick={goToLogin}>Log In</Button>
                </div>
                <div>
                    <Button onClick={goToSignUp}>Sign Up</Button>
                </div>
            </div>
        </div>
    )

    const currentUser = (loggedIn) ? loggedInUser : webUser;

    return currentUser
}

export default TopBar