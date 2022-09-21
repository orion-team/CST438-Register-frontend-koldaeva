export const SERVER_URL =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    : "https://registerb-cst438.herokuapp.com/";

export const SEMESTER_LIST = [
  { id: 0, year: 2020, name: "Fall" },
  { id: 1, year: 2021, name: "Spring" },
  { id: 2, year: 2021, name: "Fall" },
];
