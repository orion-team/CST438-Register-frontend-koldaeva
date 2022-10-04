import { DataGrid } from "@mui/x-data-grid";
import React from "react";

export const StudenList = ({ students = [] }) => {
  const columns = [
    { field: "name", headerName: "Student Name", width: 300 },
    { field: "email", headerName: "Student Email", width: 250 },
    { field: "statusCode", headerName: "Status Code", width: 100 },
    { field: "status", headerName: "Status", width: 150 },
  ];

  return (
    <div className="detail__list">
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid rows={students} columns={columns} />
      </div>
    </div>
  );
};
