'use client'
import React from 'react';
import styles from './Button.module.css'

interface ButtonProps {
type?: 'button' | 'submit' | 'reset';
onClick?: React.MouseEventHandler<HTMLButtonElement>;
children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = 'button', onClick, children }) => {
return (
    <button
    className={styles.button}
    type={type}
    onClick={onClick}
    >
    {children}
    </button>
);
};

export default Button;