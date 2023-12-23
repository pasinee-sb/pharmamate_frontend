import React, { useState, useContext, useEffect } from "react";
import Alert from "../common/Alert";
import UserContext from "../auth/UserContext";
import ApexCharts from "apexcharts";
import "./MedHistoryList.css";

import PharmamateAPI from "../api/api";

import LoadingSpinner from "../common/LoadingSpinner";
import MedHistoryCard from "./MedHistoryCard";
import { Link } from "react-router-dom";

function MedHistoryList() {
  const { currentUser } = useContext(UserContext);
  const [meds, setMedList] = useState([]);
  const [chartRender, setChartRender] = useState(false);
  const user = currentUser.username;

  useEffect(function getMedListOnMount() {
    console.debug("MedList useEffect getMedListOnMount");
    getMeds();
  }, []);

  useEffect(() => {
    console.debug("Getting the chart");
    if (meds.length > 0) {
      const chartData = meds.map((med) => {
        let startDate = convertDateToTimestamp(med.start_date);
        let stopDate = med.stop_date
          ? convertDateToTimestamp(med.stop_date)
          : new Date().getTime();
        return {
          x: med.drug_name,
          y: [startDate, stopDate],
          fillColor: med.status === "active" ? "#008FFB" : "#FF4560",
        };
      });

      const options = {
        chart: {
          type: "rangeBar",
          height: "350",
        },
        series: [{ data: chartData }],
        xaxis: {
          type: "datetime",
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: "70%",
          },
        },
        grid: {
          row: {
            colors: ["#f3f4f5", "#fff"],
            opacity: 1,
          },
        },
      };

      const chartElement = document.querySelector(".chart");
      if (chartElement) {
        console.log(chartData);
        const chart = new ApexCharts(chartElement, options);
        chart.render();
        setChartRender(true);

        return () => {
          chart.destroy();
        };
      }
    }
  }, [meds]);

  // Function to convert date string to timestamp
  function convertDateToTimestamp(dateStr) {
    if (!dateStr) return new Date().getTime(); // Handle null/undefined dates

    // Ensure the date string is in a format that Date object can parse
    // Modify this line according to your date string format
    const formattedDateStr = dateStr.split("T")[0];
    return new Date(formattedDateStr).getTime();
  }

  async function getMeds() {
    console.log("Fetching MedList");
    const myMeds = await PharmamateAPI.getMedHistory(user);
    setMedList(myMeds);
  }

  if (!meds)
    return (
      <>
        <LoadingSpinner />
        <i class="fa-solid fa-pills"></i>
      </>
    );
  return (
    <div className="container">
      {chartRender ? (
        <div className="h-100 d-flex align-items-center justify-content-center">
          {" "}
          <i class="fas fa-circle active"> Active </i>&nbsp;&nbsp;&nbsp;
          <i class="fas fa-circle inactive"> Inactive </i>
        </div>
      ) : (
        ""
      )}

      <div className="card chart custom-chart"></div>

      <div className="container d-flex justify-content-start mt-5 mb-5">
        <Link to="/med_history/add" style={{ textDecoration: "none" }}>
          <i
            class="fa-solid fa-circle-plus fa-2xl"
            style={{ color: "#27be84" }}
          >
            {" "}
            Add{" "}
          </i>
        </Link>
      </div>
      <div className="container">
        <div className="row">
          {meds.length > 0 ? (
            [...meds] // Create a copy of the meds array
              .sort((a, b) => a.drug_name.localeCompare(b.drug_name)) // Sort alphabetically by drug_name
              .map((med) => (
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
            <div className="card-container flex">
              <p>No medication history available.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MedHistoryList;
