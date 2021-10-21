import PropTypes from "prop-types";
import { ActiveProfileContextProvider } from "../../context/ActiveProfile";

export default function Dashboard({ sidebar }) {

  return (
    <ActiveProfileContextProvider>
      {sidebar}
    </ActiveProfileContextProvider>
  )
}

Dashboard.propTypes = {
  sidebar: PropTypes.node
}