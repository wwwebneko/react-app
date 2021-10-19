import { createContext, useContext } from "react";
import useLocalStorage from "../actions/useLocalStorage";

const ProfileContext = createContext(null);

const useActiveProfileContext = () => {
  const [activeProfile, setActiveProfile] = useContext(ProfileContext);

  function handleProfile(value) {
    setActiveProfile(value);
  }

  return { activeProfile: activeProfile, setActiveProfile: handleProfile}
}

const ActiveProfileContextProvider = ({children}) => {
  const [activeProfile, setActiveProfile] = useLocalStorage('profile', null);

  return (
    <ProfileContext.Provider value={[activeProfile, setActiveProfile]}>
      {children}
    </ProfileContext.Provider>
  )
}

export { ActiveProfileContextProvider, useActiveProfileContext };