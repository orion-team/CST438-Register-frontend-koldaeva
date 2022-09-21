import "./App.css";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SchedList from "./components/SchedList";
import Semester from "./components/Semester";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { Student } from "./components/student";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              <Link className="logo" to="/">
                Course Registration
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>

        <Student />
        <Switch>
          <Route exact path="/" component={Semester} />
          <Route path="/schedule" component={SchedList} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
