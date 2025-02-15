'use client'
import React from 'react';
import styles from './MovieCard.module.css'

export default function MovieCard({name, source} : {name:string, source:string}) {

  return (
    <div className={styles.main_body}>
        <h1> {name} </h1>
        <section>
            <img className={styles.movie_banner} src={source} />
        </section>
    </div>
  );
};
