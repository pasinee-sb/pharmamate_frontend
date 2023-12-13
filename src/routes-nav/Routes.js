import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
// import CompanyList from "../companies/CompanyList";
// import JobList from "../jobs/JobList";
// import CompanyDetail from "../companies/CompanyDetail";
import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import MedHistoryList from "../med_history/MedHistoryList";
import HealthJournal from "../health_journal/HealthJournal";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup, profile }) {
  console.debug(
    "Routes",
    `login=${typeof login}`,
    `register=${typeof register}`
  );

  return (
    <div className="pt-5">
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route exact path="/login">
          <LoginForm login={login} />
        </Route>
        <Route exact path="/signup">
          <SignupForm signup={signup} />
        </Route>
        {/* </PrivateRoute>
        <PrivateRoute path="/users/:username/med_history/drug_interaction">
          <ProfileForm />
        </PrivateRoute> */}
        {/*  */}

        <PrivateRoute path="/med_history">
          <MedHistoryList />
        </PrivateRoute>
        <PrivateRoute path="/health_journal">
          <HealthJournal />
        </PrivateRoute>
        <PrivateRoute path="/profile">
          <ProfileForm />
        </PrivateRoute>
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default Routes;
