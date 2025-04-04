import React, { useState, useEffect } from 'react';
import Image from 'next/image'
import fish from '../images/fish.png'
import deadFish from '../images/deadFish.png'
import styles from './SeatCard.module.css'
import { motion } from "motion/react"

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
      height={10}
      width={50}
      alt="fish"
    /> 
  )
  const aliveImage = (
    <Image
      src={fish}
      height={10}
      width={50}
      alt="fish"
    /> 
  )

  return (
    <motion.div 
      onClick={handleClick} 
      className={styles.main_body}
      animate={{
        scale: 1,
        x: 0,
        y: 0,
      }}
      whileHover={{
        scale: [1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5, 1.5],
        x: [0,  5,  2, -5,  1, 1, -3, 0],
        y: [0, -5, -3, -4, -4, 4, -3, 0],
        transition:{
          time: [0, .1, .3, .5, .6, .8, .9, 1],
          duration: 4,
          ease: ["easeIn", "easeOut"],
          repeat: Infinity,
        }
      }}
    >
      {isReserved ? deadImage : aliveImage}
    </motion.div>
  );
}