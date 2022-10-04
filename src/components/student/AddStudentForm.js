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
      fields: { studentName, studentEmail, statusCode, status },
    } = this.state.formState;

    return (
      <Dialog
        className="detail__form form"
        open={isDialogOpen}
        onClose={handleClose}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
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
                minLength: 3,
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

            <TextField
              margin="dense"
              error={statusCode.isTouched && Boolean(statusCode.errorMessage)}
              fullWidth
              label="Status Code"
              name="statusCode"
              value={statusCode.value}
              onBlur={this.makeHandleBlur("statusCode")}
              onChange={this.makeHandleChange("statusCode")}
              type="text"
              helperText={
                statusCode.isTouched && statusCode.errorMessage
                  ? statusCode.errorMessage
                  : "Set status code 1 to put a hold"
              }
              inputProps={{
                pattern: patterns.statusCode,
              }}
            />

            <TextField
              margin="dense"
              error={status.isTouched && Boolean(status.errorMessage)}
              fullWidth
              label="Status Note"
              name="status"
              value={status.value}
              onBlur={this.makeHandleBlur("status")}
              onChange={this.makeHandleChange("status")}
              type="text"
              helperText={
                status.isTouched && status.errorMessage
                  ? status.errorMessage
                  : ""
              }
              inputProps={{
                maxLength: 50,
              }}
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
                    statusCode: statusCode.value,
                    status: status.value,
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
