import { Route, Switch } from "react-router";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          {/* Homepage */}
          <Route
            exact
            path="/"
            render={(props) => <Home {...props}></Home>}
          ></Route>

          {/* Not found page (Will match anything else) */}
          <Route>
            <NotFoundPage></NotFoundPage>
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default App;
