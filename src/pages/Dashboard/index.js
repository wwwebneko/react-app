import PropTypes from "prop-types";
import styles from "./index.module.css";
import { ActiveProfileContextProvider } from "../../context/ActiveProfile";

export default function Dashboard({ sidebar }) {

  return (
    <ActiveProfileContextProvider>
      {sidebar}
      <main className={styles.main}>
        <h1>Welcome to dashboard</h1>
      </main>
    </ActiveProfileContextProvider>
  )
}

Dashboard.propTypes = {
  sidebar: PropTypes.node
}