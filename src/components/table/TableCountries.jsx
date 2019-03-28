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
import jsonData from "../../data/data.json";
import countriesData from "../../data/countries.json";

const TableCountries = () => {
  const [dataState, setDataState] = useState({});
  const [countriesState, setCountriesState] = useState({});
  const [queryCountryCode, setQueryCountryCode] = useState("");

  useEffect(() => {
    if (queryCountryCode !== "") {
      axios
        .post(`http://localhost:3000/api/holidays`, {
          countryCode: queryCountryCode
        })

        .then(res => {
          const data = res.data;
          console.log("holidays from back:", data);
          setDataState({ data });
        })
        .catch(e => {
          console.log(e);
          const data = jsonData;
          setDataState({ data });
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
        //setCountriesState({ countries });
      });
  }, [queryCountryCode]);

  const getCountryQuery = e => {
    const value = e.target.value;
    console.log("key:", value);
    setQueryCountryCode(value);
  };
  return (
    <div>
      {countriesState.res
        ? console.log("countries :)" + countriesState.res)
        : console.log("countries :(" + countriesState.res)}
      {dataState.data
        ? console.log("data :)" + dataState.data)
        : console.log("data :(" + dataState.data)}
      <FormControl>
        <InputLabel>Countries</InputLabel>
        {countriesState.res ? (
          <Select value={countriesState.res} onChange={getCountryQuery}>
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

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataState.data
            ? dataState.data.map((detail, index) => {
                return (
                  <TableRow>
                    <TableCell>{detail.date}</TableCell>
                    <TableCell>{detail.name}</TableCell>
                  </TableRow>
                );
              })
            : null}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCountries;
