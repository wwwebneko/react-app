import { useState } from "react";
import { useActiveProfileContext } from "../../context/ActiveProfile"
import SetProfileModal from "../../modals/SetProfileModal";
import './styles.css';

export default function Header() {
  const { activeProfile } = useActiveProfileContext();
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(!activeProfile);

  function getProfileInitial() {
    if (activeProfile && activeProfile.name) return activeProfile.name[0];
  }

  function handleModalToggle() {
    setIsProfileModalVisible(!isProfileModalVisible);
  }

  return (
    <header className="header">
      <button className="header-profile-icon" onClick={handleModalToggle}>{getProfileInitial()}</button>
      {isProfileModalVisible &&  <SetProfileModal onModalClose={handleModalToggle}/> }
    </header>
  )
}