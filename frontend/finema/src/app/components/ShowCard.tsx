import React, { useState, useEffect } from 'react';
import styles from './ShowCard.module.css';

interface ShowCardProps {
  date: string;
  time: string;
  checked: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function PayCard({ date, time, checked, onClick }: ShowCardProps) {
    const [style, setStyle] = useState(styles.not_clicked)
    useEffect(() => {
        if (checked) {
            setStyle(styles.clicked);
        } else {
            setStyle(styles.not_clicked);
        }

    }, [checked])

    return (
        <div className={styles.main_body} onClick={onClick}>
            <p className={style}>{date} {time}</p>
        </div>
    );
}