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

const TableCountries = () => {
  const [dataState, setDataState] = useState({});
  const [countriesState, setCountriesState] = useState({});
  const [yearState, setYearState] = useState({
    years: ["2017", "2018", "2019"]
  });
  const [queryCountryCode, setQueryCountryCode] = useState("");
  const [queryYearCode, setQueryYearCode] = useState("");

  useEffect(() => {
    if ((queryCountryCode !== "") & (queryYearCode !== "")) {
      axios
        .post(`http://localhost:3000/api/holidays`, {
          countryCode: queryCountryCode,
          yearCode: queryYearCode
        })

        .then(res => {
          const data = res.data;
          console.log("holidays from back:", data);
          setDataState({ data });
        })
        .catch(e => {
          console.log(e);
        });
    }

    axios
      .get("http://localhost:3000/api/all")
      .then(response => {
        console.log("info:", response.data);
        const res = response.data;
        setCountriesState({ res: res });
      })
      .catch(e => {
        console.log(e);
      });
  }, [queryCountryCode, queryYearCode]);

  const getCountryQuery = e => {
    const value = e.target.value;
    console.log("key:", value);
    setQueryCountryCode(value);
  };

  const getYearQuery = e => {
    const value = e.target.value;
    console.log(value);
    setQueryYearCode(value);
  };

  return (
    <div>
      {countriesState.res
        ? console.log("countries :)" + countriesState.res)
        : console.log("countries :(" + countriesState.res)}
      {dataState.data
        ? console.log("data :)" + dataState.data)
        : console.log("data :(" + dataState.data)}
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
          {countriesState.res ? (
            <Select
              value={queryCountryCode}
              onChange={getCountryQuery}
              style={{ width: "100px" }}
            >
              {countriesState.res.map((detail, index) => {
                return (
                  <MenuItem key={index} value={detail.key}>
                    <ListItemText primary={detail.key} value={detail.key} />
                  </MenuItem>
                );
              })}
            </Select>
          ) : null}
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
                ? dataState.data.map((detail, index) => {
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
