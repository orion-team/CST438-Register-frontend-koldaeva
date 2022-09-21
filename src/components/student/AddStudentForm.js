import React, { Component } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  defaultStudentForm,
  nextFormState,
  patterns,
} from "./studentFormModel";

export class AddStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { formState: defaultStudentForm };
  }

  // this a small factory function - i.e. function returning a function
  makeHandleChange = (fieldName) => (event) => {
    this.setState({
      formState: nextFormState(this.state.formState, {
        type: "CHANGE",
        inputElement: event.target,
        fieldName,
      }),
    });
  };

  // this a small factory function - i.e. function returning a function
  makeHandleBlur = (fieldName) => (event) => {
    this.setState({
      formState: nextFormState(this.state.formState, {
        type: "BLUR",
        inputElement: event.target,
        fieldName,
      }),
    });
  };

  render() {
    const { isDialogOpen, handleClose } = this.props;
    const {
      isValid,
      fields: { studentName, studentEmail },
    } = this.state.formState;

    return (
      <Dialog
        className="detail__form form"
        open={isDialogOpen}
        onClose={handleClose}
      >
        <form>
          <DialogTitle className="form__title">Add Student</DialogTitle>
          <DialogContent className="form__content">
            <TextField
              margin="dense"
              error={studentName.isTouched && Boolean(studentName.errorMessage)}
              autoFocus
              fullWidth
              label="Student Name"
              name="studentName"
              value={studentName.value}
              onBlur={this.makeHandleBlur("studentName")}
              onChange={this.makeHandleChange("studentName")}
              inputProps={{
                pattern: patterns.stundentName,
              }}
              helperText={
                studentName.isTouched && studentName.errorMessage
                  ? studentName.errorMessage
                  : ""
              }
              required
            />

            <TextField
              margin="dense"
              error={
                studentEmail.isTouched && Boolean(studentEmail.errorMessage)
              }
              autoFocus
              fullWidth
              label="Student Email"
              name="studentEmail"
              value={studentEmail.value}
              onBlur={this.makeHandleBlur("studentEmail")}
              onChange={this.makeHandleChange("studentEmail")}
              type="email"
              helperText={
                studentEmail.isTouched && studentEmail.errorMessage
                  ? studentEmail.errorMessage
                  : ""
              }
              required
            />
          </DialogContent>
          <DialogActions>
            <Button color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              disabled={!isValid}
              type="submit"
              id="Add"
              color="primary"
              onClick={() => {
                if (isValid) {
                  this.props.handleSubmit({
                    studentName: studentName.value,
                    studentEmail: studentEmail.value,
                  });
                }
              }}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}
