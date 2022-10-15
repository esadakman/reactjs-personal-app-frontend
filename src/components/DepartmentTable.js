import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toastErrorNotify } from "../helper/ToastNotify";
import { Container } from "@mui/material";
import { useContext, useEffect, useState } from "react";

function createData(index, name, personal_count) {
  // console.log(index, name, personal_count);
  return { index, name, personal_count };
}

export default function DepartmentTable() {
  const { myKey } = useContext(AuthContext);
  const navigate = useNavigate();
  const [data, setData] = useState();

  const getDepartments = async (str) => {
    try {
      const res = await axios.get(`https://esadd26.pythonanywhere.com/api/`, {
        headers: { Authorization: `Token ${myKey}` },
      });
      const rows = res.data.map((item, index) =>
        createData(index + 1, item.name, item.personal_count)
      );
      setData(rows);
      // console.log(res);
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };
  useEffect(() => {
    if (myKey) {
      getDepartments();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myKey]);

  const handleClick = (userId) => {
    navigate(`/detail/${userId}`);
  };

  return (
    <Container>
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 5, borderRadius: "1rem", padding: "1rem" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No.</TableCell>
              <TableCell align="center">Deparment Name</TableCell>
              <TableCell align="center">
                How many staff work in this department?
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } , }}
                  color='primary'
                >
                  <TableCell align="center">{row.index}</TableCell>
                  <TableCell
                    align="center"
                    onClick={() => handleClick(row.name)}
                    sx={{ cursor: "pointer" }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.personal_count}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
