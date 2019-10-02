import config from "../config";
import TokenService from "./token-service";

const employeesApiService = {
  getemployees() {
    return fetch(`${config.API_ENDPOINT}/employees`, {
      method: "GET",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  postemployee(name, user_id) {
    return fetch(`${config.API_ENDPOINT}/employees`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name,
        user_id
      })
    }).then(res => {
      return !res.ok ? res.json().then(e => Promise.reject(e)) : res.json();
    });
  },
  deleteemployee(id) {
    return fetch(`${config.API_ENDPOINT}/employees/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!  Please try again.");
      }
    });
  },
  updateemployee(id, data) {
    return fetch(`${config.API_ENDPOINT}/employees/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        id,
        ...data
      })
    }).then(res => {
      if (!res.ok) {
        throw new Error("Something went wrong!  Please try again.");
      }
    });
  }
};

export default employeesApiService;