import { Container, Typography } from "@mui/material";
import React from "react";
import DeparmentTable from "../components/DepartmentTable";

const Home = () => {
  return (
    <Container>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          bgcolor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          m: "1rem",
          width: "auto",
          boxShadow: 5,
        }}
      >
        Welcome to Personnel List App
      </Typography>
      <DeparmentTable />
    </Container>
  );
};

export default Home;
