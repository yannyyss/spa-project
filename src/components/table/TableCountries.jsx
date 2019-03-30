import React, { useState, useEffect } from "react";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import axios from "axios";
import "./TableCountries.css";
import moment from "moment";

const TableCountries = () => {
  const [dataState, setDataState] = useState({});
  const [countriesState] = useState({
    countries: [
      { label: "Mexico - MX", value: "MX" },
      { label: "Estados Unidos - US", value: "US" }
    ]
  });
  const [yearState] = useState({
    years: [2019, 2020, 2021]
  });
  const [monthsState] = useState({
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  });
  const [queryCountryCode, setQueryCountryCode] = useState("");
  const [queryYearCode, setQueryYearCode] = useState("");
  const [monthVariable, setMonthVariable] = useState("");

  useEffect(() => {
    if (
      (queryCountryCode !== "") &
      (queryYearCode !== "") &
      (monthVariable !== "")
    ) {
      axios
        .post(`https://spaback.herokuapp.com/api/holidays`, {
          countryCode: queryCountryCode,
          yearCode: queryYearCode
        })

        .then(res => {
          const data = res.data;

          setDataState({ data });
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [queryCountryCode, queryYearCode, monthVariable]);

  const getCountryQuery = e => {
    const value = e.target.value;

    setQueryCountryCode(value);
  };

  const getYearQuery = e => {
    const value = e.target.value;

    setQueryYearCode(value);
  };

  const getMonth = e => {
    const value = e.target.value;

    setMonthVariable(value);
  };

  return (
    <div>
      <div
        style={{
          margin: "auto",
          maxWidth: "400px",
          padding: "2vh 50px",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <FormControl>
          <InputLabel>Countries</InputLabel>
          <Select
            value={queryCountryCode}
            onChange={getCountryQuery}
            style={{ width: "170px" }}
          >
            {countriesState.countries.map((detail, index) => {
              return (
                <MenuItem key={index} value={detail.value}>
                  <ListItemText primary={detail.label} value={detail.value} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Year</InputLabel>
          <Select
            value={queryYearCode}
            onChange={getYearQuery}
            style={{ width: "100px" }}
          >
            {yearState.years.map((detail, index) => {
              return (
                <MenuItem key={index} value={detail}>
                  <ListItemText primary={detail} value={detail} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel>Months</InputLabel>
          <Select
            value={monthVariable}
            onChange={getMonth}
            style={{ width: "100px" }}
          >
            {monthsState.months.map((detail, index) => {
              return (
                <MenuItem key={index} value={detail}>
                  <ListItemText primary={detail} value={detail} />
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </div>

      {dataState.data ? (
        <div
          style={{
            width: "100%",
            maxWidth: "600px",
            margin: "auto",
            marginTop: "2vh"
          }}
        >
          <Table>
            <TableHead style={{ backgroundColor: "#000" }}>
              <TableRow>
                <TableCell
                  style={{
                    textAlign: "left",
                    color: "#fff",
                    paddingLeft: "50px"
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  style={{
                    textAlign: "right",
                    color: "#fff",
                    paddingRight: "50px"
                  }}
                >
                  Event
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataState.data
                ? dataState.data
                    .filter(
                      item => monthVariable === moment(item.date).format("MMMM")
                    )
                    .map((detail, index) => {
                      return (
                        <TableRow key={index} className="table-color">
                          <TableCell
                            style={{
                              textAlign: "left",
                              paddingLeft: "50px"
                            }}
                          >
                            {detail.date}
                          </TableCell>
                          <TableCell
                            style={{
                              textAlign: "right",
                              paddingRight: "50px"
                            }}
                          >
                            {detail.name}
                          </TableCell>
                        </TableRow>
                      );
                    })
                : null}
            </TableBody>
          </Table>
        </div>
      ) : null}
    </div>
  );
};

export default TableCountries;
