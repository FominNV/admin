import axios from "axios"

export default axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    "Access-Control-Allow-Headers":
      "x-requested-with, Content-Type, origin, Authorization, accept, x-api-factory-application-id",
    "X-Api-Factory-Application-Id": process.env.REACT_APP_API_KEY as string
  }
})
