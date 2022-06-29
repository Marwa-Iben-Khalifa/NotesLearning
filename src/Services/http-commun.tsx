import axios from "axios";
export default axios.create({
  baseURL: "https://m66nqp6pe8.eu-west-1.awsapprunner.com/note",
  headers: {
    "Content-type": "application/json",
  },
});
