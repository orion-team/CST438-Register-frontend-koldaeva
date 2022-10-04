import Cookies from "js-cookie";
import { SERVER_URL } from "../constants";
import { toast } from "react-toastify";

// These are a generic functions to perform requests to the server
// So we don't need to set URL, token and stringify object every time
// These functions handle logging and fetch mechanics

export const postResource = (resourceURL, bodyObject, label = "") => {
  console.log(`Adding ${label}`);

  const token = Cookies.get("XSRF-TOKEN");
  const body = JSON.stringify(bodyObject);

  return fetch(`${SERVER_URL}/${resourceURL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-XSRF-TOKEN": token },
    body,
  }).catch((error) => {
    console.log(label);
    // Generic error that will be the same for any post request
    toast.error(`Error when adding ${label}`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(error);
  });
};

export const deleteResource = (resourceURL, label = "") => {
  console.log(`Deleting ${label}`);

  const token = Cookies.get("XSRF-TOKEN");

  return fetch(`${SERVER_URL}/${resourceURL}`, {
    method: "DELETE",
    headers: { "X-XSRF-TOKEN": token },
  }).catch((error) => {
    console.log(label);
    // Generic error that will be the same for any delete request
    toast.error(`Error when deleting ${label}`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(error);
  });
};

export const getResource = (resourceURL, label = "") => {
  console.log(`Reading ${label}`);

  const token = Cookies.get("XSRF-TOKEN");

  return fetch(`${SERVER_URL}/${resourceURL}`, {
    method: "GET",
    headers: { "X-XSRF-TOKEN": token },
  })
    .then((response) => {
      console.log("FETCH RESP:" + response);
      return response.json();
    })
    .catch((error) => {
      console.log(label);
      // Generic error that will be the same for any get request
      toast.error(`Error when fetching ${label}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      console.error(error);
    });
};
