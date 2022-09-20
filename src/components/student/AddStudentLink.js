import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const AddStudentLink = () => (
  <Button
    component={Link}
    to={{
      pathname: "student/add",
    }}
    variant="outlined"
    color="primary"
    style={{ margin: 10 }}
  >
    Add Student
  </Button>
);
