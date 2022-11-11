import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../store/user";
import styles from "../styles/Home.module.css";

function OtherPage() {
  const ctx = useContext(UserContext);

  return (
    <div className={styles.container}>
      <Link href='/'>
        <button className={styles.btn}>&lt; Back</button>
      </Link>
      <h1>Other Page</h1>
      <div className={styles.userDetails}>
        <h1>User Details</h1>
        <p>Name: {ctx.userName}</p>
        <p>Age: {ctx.userAge}</p>
        <p>Fav. Colour: {ctx.userFavouriteColour}</p>
      </div>
    </div>
  );
}

export default OtherPage;
