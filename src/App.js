import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

function ScrollToTop() {
  const { pathname } = useLocation();

  // when pathname is changing we scroll page to the top

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log()
  }, [pathname]);

  return null;
}

function App() {

  return (
    <Router>
      <ScrollToTop />
      <Switch>
        <Route path="/" exact>
          <Dashboard/>
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
