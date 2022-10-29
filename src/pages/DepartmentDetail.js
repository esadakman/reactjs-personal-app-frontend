import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { Button, Container, Typography } from "@mui/material";
import { useContext, useState } from "react";

function createData(
  index,
  days,
  title,
  first_name,
  last_name,
  gender,
  salary,
  is_staffed,
  id
) {
  // console.log(index, days, first_name, last_name, gender, salary);
  return {
    index,
    days,
    title,
    first_name,
    last_name,
    gender,
    salary,
    is_staffed,
    id,
  };
}

export default function DeparmentDetail() {
  const { str } = useParams();
  const { myKey } = useContext(AuthContext);
  const isStaff = sessionStorage.getItem("is_staff") || false;
  const [data, setData] = useState();
  const [departmentId, setId] = useState();
  const navigate = useNavigate();
  const getDepartments = async () => {
    try {
      const res = await axios.get(
        `https://esadd26.pythonanywhere.com/api/department/${str}/`,
        { headers: { Authorization: `Token ${myKey}` } }
      );
      // console.log(res);
      const rows = res.data[0].departments.map((item, index) =>
        createData(
          index + 1,
          item.days_since_joined,
          item.title,
          item.first_name,
          item.last_name,
          item.gender,
          item.salary,
          item.is_staffed,
          item.id
        )
      );
      setData(rows);
      setId(res.data[0].id);
    } catch (error) {
      toastErrorNotify(error.message);
    }
  };
  React.useEffect(() => {
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // ! handleDelete

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://esadd26.pythonanywhere.com/api/personal/${id}`,
        { headers: { Authorization: `Token ${myKey}` } }
      );
      console.log(res);
      toastSuccessNotify("Personnel succesfully delete");
      getDepartments();
    } catch (error) {
      toastErrorNotify("You need access to perform this action");
    }
  };
  const handleEdit = () => {};
  const handleClick = () => {
    navigate("/create-personal", { state: { departmentId } });
  };

  // ! handleUpdate
  const handleUpdate = (userData) => {
    navigate(`/update-personal/${userData.id}`, { state: { userData } });
    // console.log(userData);
  };

  return (
    <Container maxWidth="lg">
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          bgcolor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          my: "1rem",
          width: "auto",
          boxShadow: 5,
        }}
      >
        {str} Deparments Personnel List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">No</TableCell>
              <TableCell align="center">Join Date</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Salary</TableCell>
              {/* <TableCell align="center">Is Staffed?</TableCell> */}
              {isStaff === "true" && (
                <>
                  <TableCell align="center">Edit</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data?.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.index}</TableCell>
                  <TableCell align="center">{row.days} day ago</TableCell>
                  <TableCell align="center">{row.title}</TableCell>
                  <TableCell align="center">{row.first_name}</TableCell>
                  <TableCell align="center">{row.last_name}</TableCell>
                  <TableCell align="center">{row.gender}</TableCell>
                  <TableCell align="center">{row.salary} $</TableCell>
                  {/* <TableCell align="center">
                    {row.is_staffed ? "✅" : "❌"}
                  </TableCell> */}
                  {isStaff === "true" && (
                    <>
                      <TableCell
                        align="center"
                        sx={{ cursor: "pointer" }}
                        onClick={handleEdit}
                      >
                        <Button
                          color="primary"
                          sx={{ minWidth: "0" }}
                          onClick={() => handleUpdate(row)}
                        >
                          <EditIcon />
                          {/* <PersonalUpdate info={row}/> */}
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ cursor: "pointer" }}>
                        <Button
                          color="error"
                          sx={{ minWidth: "0" }}
                          onClick={() => handleDelete(row.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{display:'flex',justifyContent:'space-between',marginTop:'1rem' }}>
        {isStaff === "true" && (
          <Button onClick={handleClick} variant="contained" >
            Add Personnel
          </Button>
        )}
        <Button
          style={{ width: 100 }}
          variant="contained"
          onClick={() => navigate("/home")}
          color="error"
        >
          Go Back
        </Button>
      </div>
    </Container>
  );
}
