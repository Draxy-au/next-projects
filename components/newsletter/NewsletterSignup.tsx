import { FormEvent, Ref, useContext, useRef } from "react";
import NotificationContext from "../../contexts/notification-context";
import styles from "./NewsletterSignup.module.css";

function NewsletterSignup() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const { showNotification } = useContext(NotificationContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    showNotification(
      "PENDING",
      "ADDING EMAIL",
      "Adding the email address to the Newsletter Mailing List.",
      5000
    );

    if (!emailInputRef.current || !emailInputRef.current.value) {
      return;
    }
    const email = emailInputRef.current.value;

    const response = await fetch("/api/newsletter", {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response: ", await response.json());
    showNotification(
      "SUCCESS",
      "EMAIL ADDED",
      "Email address addedto the Newsletter Mailing List.",
      5000
    );
    emailInputRef.current.value = "";
  }

  return (
    <div className={styles.newsletterSignup}>
      <h2>Sign up to stay updated!</h2>
      <form className={styles.inputEmail} onSubmit={(e) => handleSubmit(e)}>
        <input
          className={styles.input}
          type='email'
          name='email'
          ref={emailInputRef}
        />
        <button type='submit' className={styles.btn}>
          Register
        </button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
