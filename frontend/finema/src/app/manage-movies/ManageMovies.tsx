
'use client'
import React, { useState } from 'react';
import styles from './ManageMovies.module.css'
import TopBar from '../components/TopBar';
import Button from '../components/Button';


export default function ManageMovies() {

  function foo() {
    console.log('PHEW!')
  }

  return (
    <div>
      <div className={styles.top}>
        <TopBar loggedIn={true} showEditProfile={false}/>
      </div>
      <section className={styles.main_body}>
          <section className={styles.movie_info}>
            <div className={styles.input_section}>
              <h1> Movie Title </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Category </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Cast </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Director </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Producer </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Reviews? </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Trailer (picture and video?) </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> MPAA-US film rating code </h1>
              <input></input>
            </div>
            <div className={styles.input_section}>
              <h1> Showtimes (date and time sections?) </h1>
              <input></input>
            </div>
            <Button onClick={foo}> Add Movie </Button>
            </section>
            <h1> Current Movies </h1>
            <h1> lists all movies in database with option to edit or delete? </h1>

            <section>

            </section>
          </section>
    </div>
  );
};