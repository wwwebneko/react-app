import { useState } from "react";
import { useActiveProfileContext } from "../../context/ActiveProfile"
import SetProfileModal from "../../modals/SetProfileModal";
import styles from './index.module.css';

export default function Header() {
  const { activeProfile } = useActiveProfileContext();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(!activeProfile);

  function handleModalToggle() {
    setIsProfileModalVisible(!isProfileModalVisible);
  }

  return (
    <header className={styles.header}>
      {activeProfile && <button className={styles.profileIcon} onClick={handleModalToggle} style={{ backgroundImage: `url(${activeProfile.avatar})` }}></button>}
      {isProfileModalVisible &&  <SetProfileModal onModalClose={handleModalToggle}/> }
    </header>
  )
}