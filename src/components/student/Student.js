import React, { Component } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Route, Switch } from "react-router-dom";
import { AddStudent } from "./AddStudent";
import { AddStudentLink } from "./AddStudentLink";

export class Student extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Student Registration
            </Typography>
          </Toolbar>
        </AppBar>
        <div align="left">
          <Switch>
            <Route exact path="/" component={AddStudentLink} />
            <Route exact path="/student/add" component={AddStudent} />
          </Switch>
        </div>
      </div>
    );
  }
}
