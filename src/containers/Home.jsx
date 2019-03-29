import React from "react";
import TableCountries from "../components/table/TableCountries";

const Home = () => {
  return (
    <div>
      <h2 style={{ marginTop: "10vh" }}>Hello! Find the holidays here:</h2>
      <TableCountries />
    </div>
  );
};

export default Home;
