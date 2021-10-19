import { ActiveProfileContextProvider } from "../../context/ActiveProfile";

export default function Dashboard({ sidebar }) {

  return (
    <ActiveProfileContextProvider>
      {sidebar}
    </ActiveProfileContextProvider>
    
  )
}