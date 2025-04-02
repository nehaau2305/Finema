import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import fish from '../images/fish.png'
import deadFish from '../images/deadFish.png'
import styles from './SeatCard.module.css'

interface Seat {
  id:number,
  showroomID:number,
  seatNum:number,
  reserved:boolean
}

interface SeatCardProps {
  seatNum:number;
  reserved:boolean;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

export default function SeatCard({ seatNum, reserved, onClick }: SeatCardProps) {
  const [isReserved, setIsReserved] = useState(reserved)

  const handleClick = (e:any) => {
    const temp = isReserved;
    setIsReserved(false)
    // Will have set to reserved as only option and to disable call back
    if (!isReserved) {
      onClick(e)
    }
  }

  const deadImage = (
    <Image
      src={deadFish}
      height={50}
      width={50}
      alt="fish"
    /> 
  )
  const aliveImage = (
    <Image
      src={fish}
      height={50}
      width={50}
      alt="fish"
    /> 
  )

  return (
    <div onClick={handleClick} className={styles.main_body}>
      {isReserved ? deadImage : aliveImage}
    </div>
  );
}