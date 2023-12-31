import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";

import LoginForm from "../auth/LoginForm";
import ProfileForm from "../profiles/ProfileForm";
import SignupForm from "../auth/SignupForm";
import PrivateRoute from "./PrivateRoute";
import MedHistoryList from "../med_history/MedHistoryList";
import HealthJournal from "../health_journal/HealthJournal";
import EditMedHistory from "../med_history/EditMedHistory";
import DeleteMed from "../med_history/DeleteMed";
import AddMedHistory from "../med_history/AddMedHistory";
import AddHealthJournal from "../health_journal/AddHealthJournal";
import EditHealthJournal from "../health_journal/EditHealthJournal";
import DeleteHealthJournal from "../health_journal/DeleteHealthJournal";
import SearchResultsPage from "../drug_search/SearchResultPage";
import DrugDetail from "../drug_search/DrugDetail";

/** Site-wide routes.
 *
 * Parts of site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existant route redirects to the homepage.
 */

function Routes({ login, signup }) {
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
        <Route exact path="/search">
          <SearchResultsPage />
        </Route>
        <Route exact path="/drug/:setId">
          <DrugDetail />
        </Route>

        <PrivateRoute path="/med_history/edit/:medId">
          <EditMedHistory />
        </PrivateRoute>
        <PrivateRoute path="/med_history/delete/:medId">
          <DeleteMed />
        </PrivateRoute>
        <PrivateRoute path="/med_history/add">
          <AddMedHistory />
        </PrivateRoute>
        <PrivateRoute path="/med_history">
          <MedHistoryList />
        </PrivateRoute>
        <PrivateRoute path="/health_journal/delete">
          <DeleteHealthJournal />
        </PrivateRoute>
        <PrivateRoute path="/health_journal/add">
          <AddHealthJournal />
        </PrivateRoute>
        <PrivateRoute path="/health_journal/edit">
          <EditHealthJournal />
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
