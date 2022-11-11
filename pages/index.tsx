import { useContext, useState } from "react";
import styles from "../styles/Home.module.css";
import { UserContext } from "../store/user";
import Link from "next/link";

export default function Home() {
  const ctx = useContext(UserContext);
  const [iUserName, setIUserName] = useState("");
  const [iAge, setIAge] = useState(0);
  const [iFavColour, setIFavColour] = useState("");

  function setUserHandler() {
    ctx.setUserName(iUserName);
    ctx.setUserAge(iAge);
    ctx.setUserFavouriteColour(iFavColour);
  }

  return (
    <div className={styles.container}>
      <Link href='/other'>
        <button className={styles.btn}>Other Page</button>
      </Link>
      <div className={styles.userDetails}>
        <h1>User Details</h1>
        <p>Name: {ctx.userName}</p>
        <p>Age: {ctx.userAge}</p>
        <p>Fav. Colour: {ctx.userFavouriteColour}</p>
      </div>
      <div className={styles.changeUserDetails}>
        <input
          type='text'
          value={iUserName}
          onChange={(e) => setIUserName(e.target.value)}
        />
        <input
          type='number'
          value={iAge}
          onChange={(e) => setIAge(+e.target.value)}
        />
        <input
          type='text'
          value={iFavColour}
          onChange={(e) => setIFavColour(e.target.value)}
        />
        <button className={styles.btn} onClick={setUserHandler}>
          Set User
        </button>
      </div>
    </div>
  );
}
