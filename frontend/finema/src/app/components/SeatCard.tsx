import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import fish from '../images/fish.png'
import deadFish from '../images/deadFish.png'
import styles from './SeatCard.module.css'

interface SeatCardProps {
  reserved:boolean;
  seatNum: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function SeatCard({ reserved, seatNum, onClick }: SeatCardProps) {
  const [fishImage, setFishImage] = useState((
    <Image
      src={fish}
      height={50}
      width={50}
      alt="fish"
      /> 
    ))

  useEffect(() => {
    if (reserved) {
      setFishImage((
        <Image
          src={deadFish}
          height={50}
          width={50}
          alt="fish"
          /> 
        ))
    } else {
      setFishImage((
        <Image
          src={fish}
          height={50}
          width={50}
          alt="fish"
          /> 
        ))
    }
  }, [reserved])

  return (
    <section onClick={onClick} className={styles.main_body}>
      {fishImage}
    </section>
  );
}