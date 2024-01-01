import axios from "axios";

const BASE_URL = "https://pharmamate-backend.onrender.com";
// ||
// "http://localhost:3001";

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
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  /** Get homepage */
  static async getHomePage() {
    let res = await this.request("");
    return res;
  }

  // Individual API routes

  /** Get the current user. */

  static async getCurrentUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  static async getDrugAutocomplete(searchValue) {
    const response = await axios.get(
      `https://dailymed.nlm.nih.gov/dailymed/services/v2/drugnames.json?drug_name=${searchValue}`
    );
    return response.data;
  }

  static async getDrug(drug) {
    let res = await this.request("search", { drug });

    return res;
  }

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
    let res = await this.request(`users/${username}`, data, "put");
    return res.user;
  }

  // /*Get medication history

  static async getMedHistory(username) {
    let res = await this.request(`users/${username}/med_history`);

    return res.medication_history;
  }

  // /* Get specific medication history

  static async getMedById(username, medId) {
    let res = await this.request(`users/${username}/med_history/${medId}`);

    return res.medication_history;
  }

  // /* Add medication history

  static async addMedHistory(username, data) {
    data.stopDate = data.stopDate || null;
    let res = await this.request(`users/${username}/med_history`, data, "post");

    return res.medication_history;
  }

  // /*Edit medication history
  static async editMedHistory(username, data, medIdNum) {
    data.stopDate = data.stopDate || null;

    let res = await this.request(
      `users/${username}/med_history/${medIdNum}`,
      data,
      "put"
    );
    return res.medication_history;
  }

  // /*Delete medication history
  static async deleteMedHistory(username, medIdNum) {
    let res = await this.request(
      `users/${username}/med_history/${medIdNum}`,
      {},
      "delete"
    );
    return res.medication_history;
  }

  // /*Get health journal

  static async getHealthJournal(username) {
    let res = await this.request(`users/${username}/health_journal`);
    return res.health_journal;
  }
  // /* Add Health Journal

  static async addHealthJournal(username, data) {
    let res = await this.request(
      `users/${username}/health_journal`,
      data,
      "post"
    );

    return res.health_journal;
  }
  // /*Edit medication history
  static async editHealthJournal(username, data) {
    let res = await this.request(
      `users/${username}/health_journal`,
      data,
      "put"
    );
    return res.health_journal;
  }
  // /*Delete medication history
  static async deleteHealthJournal(username) {
    let res = await this.request(
      `users/${username}/health_journal`,
      {},
      "delete"
    );
    return res.health_journal;
  }
}

export default PharmamateAPI;
