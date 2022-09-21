import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import { AddStudentForm } from "./AddStudentForm";
import { postResource } from "../../api/api";

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

  addStudent = (student) => {
    postResource(`student`, student, "student")
      .then((res) => {
        if (res.ok) {
          toast.success("Student successfully added", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
        } else {
          toast.error("Error when adding student", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .finally(() => {
        this.setState({ open: false });
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
            handleSubmit={this.addStudent}
          />
        </div>
        <ToastContainer autoClose={1500} />
      </section>
    );
  }
}
