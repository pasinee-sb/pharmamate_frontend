import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Articles from "./Articles";
import "./Article.css";

import UserContext from "../auth/UserContext";
import { Modal, Button } from "react-bootstrap";

import SearchForm from "../drug_search/SearchForm";

function Homepage() {
  const history = useHistory();
  const { currentUser } = useContext(UserContext);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      setShow(true);
    }
  }, [currentUser]);
  const handleClose = () => setShow(false);

  function handleSearchSubmit(searchTerm) {
    history.push(`/search?drug=${encodeURIComponent(searchTerm)}`);
  }

  return (
    <div className="Homepage">
      <div className="container text-center">
        <div className="container mb-8">
          <h1 className="font-weight-bold">PharmaMate</h1>
          <p className="lead">For every med you take</p>
        </div>
        {currentUser ? (
          ""
        ) : (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Welcome to PharmaMate!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {" "}
              <p>
                Sign up to create your medication profile and start managing
                your health journey easily and effectively today.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-danger"
                variant="secondary"
                onClick={handleClose}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}

        <SearchForm onSearchSubmit={handleSearchSubmit} />
      </div>
      <Articles />
    </div>
  );
}

export default Homepage;
