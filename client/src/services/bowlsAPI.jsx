import { request } from "../utilities/api";
// TODO change bowl to car
const bowlsURL = "/api/bowls";

const getAllBowls = () => request("GET", bowlsURL);
const getBowlsById = (id) => request("GET", `${bowlsURL}/${id}`);

// new functions to create, update, and delete blog bowls
const createBowl = (bowl) => request("POST", bowlsURL, bowl);
const updateBowl = (bowl) => request("PATCH", `${bowlsURL}/${bowl.id}`, bowl);
const deleteBowl = (id) => request("DELETE", `${bowlsURL}/${id}`);

// API URL patterns
// /api/bowls    GET
// /api/bowls/34 GET
// /api/bowls    bowl
// /api/bowls/55 PATCH
// /api/bowls/88 DELETE

export default {
  getAllBowls,
  getBowlsById,
  createBowl,
  updateBowl,
  deleteBowl,
};
