import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import axios from "axios";

const TableCountries = () => {
  const [dataState, setDataState] = useState(0);

  useEffect(() => {
    const config = {
      headers: {
        "Access-Control-Allow-Origin": true
      }
    };

    axios
      .get("https://date.nager.at/Api",{
        headers: config
      })

      .then(res => {
        const data = res.data;
        console.log(data);
        setDataState({ data });
      })
      .catch(e => {
        console.log(e);
      });
  }, [dataState]);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            //dataState.data.map((detail, index) => {
            //return (
            <TableRow>
              <TableCell>T</TableCell>
            </TableRow>
            //);
            //})
          }
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCountries;
