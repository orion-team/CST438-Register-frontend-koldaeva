import React, { Component } from "react";
import { Button } from "@mui/material";
import { AddStudentForm } from "./AddStudentForm";

export class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleOpen = () => {
    this.setState({
      open: true,
    });
  };

  render() {
    return (
      <section className="detail">
        <div className="detail__button">
          <Button
            className="detail__button-btn"
            variant="outlined"
            color="primary"
            style={{ margin: 10 }}
            onClick={this.handleOpen}
          >
            Add Student
          </Button>
          <AddStudentForm
            isDialogOpen={this.state.open}
            handleClose={this.handleClose}
          />
        </div>
      </section>
    );
  }
}
