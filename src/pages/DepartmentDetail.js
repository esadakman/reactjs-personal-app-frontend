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
  console.log(index, days, first_name, last_name, gender, salary);
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
  console.log(str)
  const { myKey } = React.useContext(AuthContext);
  const isStaff = sessionStorage.getItem("is_staff") || false;
  const [data, setData] = React.useState();
  const [departmentId, setId] = React.useState();
  const navigate = useNavigate();
  const getDepartments = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/department/${str}/`,
        { headers: { Authorization: `Token ${myKey}` } }
      );
      console.log(res);
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
      // toastErrorNotify(error.message)
    }
  };
  React.useEffect(() => {
    getDepartments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://127.0.0.1:8000/api/personal/${id}`,
        { headers: { Authorization: `Token ${myKey}` } }
      );
      console.log(res);
      toastSuccessNotify("Personel başarıyla silindi!");
      getDepartments();
    } catch (error) {
      toastErrorNotify("Bu işlemi yapabilmen için daha çok çalışman lazım");
    }
  };
  const handleEdit = () => {};
  const handleClick = () => {
    navigate("/create-personal", { state: { departmentId } });
  };

  const handleUpdate = (deparment) => {
    navigate(`/update-personal/${deparment}`);
    console.log(deparment);
  };

  return (
    <Container maxWidth="md">
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
        {str} Deparments Personal List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">N.</TableCell>
              <TableCell align="center">Did Joined?</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Salary</TableCell>
              <TableCell align="center">Is Staffed?</TableCell>
              {isStaff !== "false" && (
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
                  <TableCell align="center">
                    {row.is_staffed ? "✅" : "❌"}
                  </TableCell>
                  {isStaff !== "false" && (
                    <>
                      <TableCell
                        align="center"
                        sx={{ cursor: "pointer" }}
                        onClick={handleEdit}
                      >
                        <Button
                          color="primary"
                          sx={{ minWidth: "0" }}
                          onClick={() => handleUpdate(row.id)}
                        >
                          <EditIcon />
                        </Button>
                      </TableCell>
                      <TableCell align="center" sx={{ cursor: "pointer" }}>
                        <Button
                          color="error"
                          sx={{ minWidth: "0" }}
                          onClick={() => handleClick(row.name)}
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

      {isStaff !== "false" && (
        <Button onClick={handleClick} variant="contained" sx={{ mt: 3 }}>
          Add Personal
        </Button>
      )}
    </Container>
  );
}
