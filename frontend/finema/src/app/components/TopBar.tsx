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

    async function goToWebUserHome() {
        setToken("null")
        try {
            const response = await fetch(`http://localhost:8080/users/logout`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token,
                },
                body: JSON.stringify(token),
              });
        
              if (!response.ok) {
                console.log(response);
                throw new Error('Network response was not ok');
              } else {
                console.log("response is ok");
              }
        } catch (error) {
            console.error('Error logging out:', error);
        }
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