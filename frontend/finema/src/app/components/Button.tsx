'use client'
import React from 'react';
import styles from './Button.module.css'
import Image, { StaticImageData } from 'next/image'

interface ButtonProps {
type?: 'button' | 'submit' | 'reset';
onClick?: React.MouseEventHandler<HTMLButtonElement>;
children: React.ReactNode;
pngSrc?: string | StaticImageData;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children, pngSrc }) => {
return (
    <button className={styles.button} type={type} onClick={onClick}>
        {pngSrc && <img src={typeof pngSrc === 'string' ? pngSrc : pngSrc.src} alt="Finema Logo" className={styles.finema_logo} />}
    {children}
    </button>
);
};

export default Button;