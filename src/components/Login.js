import Tabs from "./Tabs";
import styles from "../styles/login.module.css";
import loginIcon from "../myIcon/login.svg";
export default function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.leftDiv}>
        <img className={styles.image} src={loginIcon} alt="background image" />
      </div>
      <div className={styles.rightDiv}>
        <Tabs />
      </div>
    </div>
  );
}
