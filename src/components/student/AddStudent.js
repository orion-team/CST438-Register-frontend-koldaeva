import React, { Component } from "react";

import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import { AddStudentForm } from "./AddStudentForm";
import { getResource, postResource } from "../../api/api";
import { StudenList } from "./StudentList";

export class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false, students: [] };
  }

  componentDidMount() {
    this.fetchStudents();
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
          this.fetchStudents();
        } else {
          toast.error("Error when adding student", {
            position: toast.POSITION.BOTTOM_LEFT,
          });
          console.error("Post http status =" + res.status);
        }
      })
      .finally(() => {
        this.setState({ ...this.state, open: false });
      });
  };

  fetchStudents = () => {
    getResource(`student`, "student").then((res) => {
      if (Array.isArray(res)) {
        this.setState({
          ...this.state,
          students: res.map((student) => ({
            ...student,
            id: student.student_id,
          })),
        });
      } else {
        toast.error("Error when fetching students", {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        console.error("Get http status =" + res.status);
      }
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
        <StudenList students={this.state.students} />
        <ToastContainer autoClose={1500} />
      </section>
    );
  }
}
