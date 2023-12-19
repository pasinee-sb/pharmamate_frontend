import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import ApexCharts from "apexcharts";

// eslint-disable-next-line
import useTimedMessage from "../hooks/useTimedMessage";
import PharmamateAPI from "../api/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../common/LoadingSpinner";
import MedHistoryCard from "./MedHistoryCard";
import { Link } from "react-router-dom";

function MedHistoryList() {
  const { currentUser } = useContext(UserContext);
  const [meds, setMedList] = useState([]);
  const user = currentUser.username;

  useEffect(function getMedListOnMount() {
    console.debug("MedList useEffect getMedListOnMount");
    getMeds();
  }, []);
  async function getMeds() {
    console.log("I am here fetching MedList");
    const myMeds = await PharmamateAPI.getMedHistory(user);
    setMedList(myMeds);
    renderChart(myMeds);
  }
  async function renderChart(medData) {
    const chartData = medData.map((med) => {
      return {
        x: med.drug_name,
        y: [
          new Date(med.start_date.split("T")[0]).getTime(),
          med.stop_date
            ? new Date(med.stop_date.split("T")[0]).getTime()
            : new Date().getTime(),
        ],
      };
    });
    const options = {
      chart: {
        type: "rangeBar",
        height: 350,
      },
      series: [{ data: chartData }],
      xaxis: {
        type: "dateTime",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
    };
    let chart = new ApexCharts(document.querySelector(".chart"), options);
    chart.render();
  }
  if (!meds) return <LoadingSpinner />;
  return (
    <div>
      <Link to={`/med_history/add`} className="btn btn-sm btn-info">
        Add drug
      </Link>
      <div className="card chart"></div>
      {meds.length > 0 ? (
        meds.map((med) => (
          <MedHistoryCard
            key={med.id}
            id={med.id}
            name={med.drug_name}
            status={med.status}
            start={med.start_date}
            stop={med.stop_date}
          />
        ))
      ) : (
        <p>No medication history available.</p>
      )}
      {/* Other div elements */}
    </div>
  );
}

export default MedHistoryList;
