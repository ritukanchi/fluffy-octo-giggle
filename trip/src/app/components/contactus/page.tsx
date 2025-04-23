"use client";

import styles from "./ContactUs.module.css";

export default function ContactUs() {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Contact Us</h2>
      <p className={styles.paragraph}>
        We'd love to hear from you! Please fill out the form below to get in touch.
      </p>
      <form className={styles.form}>
        <input type="text" placeholder="Your Name" className={styles.input} />
        <input type="email" placeholder="Your Email" className={styles.input} />
        <textarea
          placeholder="Your Message"
          className={`${styles.input} ${styles.textarea}`}
        />
        <button type="submit" className={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
}
