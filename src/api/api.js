import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class PharmamateAPI {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${PharmamateAPI.token}` };
    const params = method === "get" ? data : {};

    try {
      console.log(`This is url`, url);
      console.log(`This is method`, method);
      console.log(`This is data`, data);
      console.log(`This is params`, params);
      console.log(`This is headers`, headers);
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Get companies (filtered by name if not undefined) */

  static async getDrug(drug) {
    let res = await this.request("search", { drug });

    return res;
  }

  // /** Get details on a company by handle. */

  // static async getCompany(handle) {
  //   let res = await this.request(`companies/${handle}`);
  //   return res.company;
  // }

  // /** Get list of jobs (filtered by title if not undefined) */

  // static async getJobs(title) {
  //   let res = await this.request("jobs", { title });
  //   return res.jobs;
  // }

  // /** Apply to a job */

  // static async applyToJob(username, id) {
  //   await this.request(`users/${username}/jobs/${id}`, {}, "post");
  // }

  // /** Get token for login from username, password. */

  static async login(data) {
    let res = await this.request(`auth/token`, data, "post");
    return res.token;
  }

  // /** Signup for site. */

  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }

  // /** Save user profile page. */

  static async saveProfile(username, data) {
    console.log(`This is in the API ${username}  and ${data}`);

    console.log(data);

    let res = await this.request(`users/${username}`, data, "put");
    return res.user;
  }

  // /*Get medical history

  static async getMedHistory(username) {
    console.log(`I am hitting getMedHistoy route`);
    let res = await this.request(`users/${username}/med_history`);
    console.log(`This is what i got`, res);
    return res.medication_history;
  }

  // /*Edit medical history
  static async editMedHistory(username, data, medIdNum) {
    console.log(`I am hitting editMedHistory route`);
    let res = await this.request(
      `users/${username}/med_history/${medIdNum}`,
      data,
      "put"
    );
    return res.medication_history;
  }

  // /*Get health journal

  static async getHealthJournal(username) {
    console.log(`I am hitting getMedHistoy route`);
    let res = await this.request(`users/${username}/health_journal`);
    console.log(`This is what i got`, res);
    return res.health_journal;
  }
}

export default PharmamateAPI;
