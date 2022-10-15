import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate } from "react-router-dom";
// import { PersonalContext } from '../contexts/PersonalContext';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { Container } from "@mui/material";

export default function PersonalCreate() {
  const navigate = useNavigate();
  const { myKey } = React.useContext(AuthContext);
  const location = useLocation();
  const { departmentId } = location.state;
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  // const [isStaffed, setIsStaffed] = React.useState(false);
  const [title, setTitle] = React.useState("Junior");
  const [gender, setGender] = React.useState("Male");
  const [salary, setSalary] = React.useState(1250);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      };

      let bodyContent = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        // is_staffed: isStaffed,
        title: title,
        gender: gender,
        salary: salary,
        department: departmentId,
      });

      let reqOptions = {
        url: "https://esadd26.pythonanywhere.com/api/personal/",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      };
      // console.log(reqOptions);

      let response = await axios.request(reqOptions);
      if (response.status === 201) {
        toastSuccessNotify("Personal succesfully created!");
        navigate(-1);
      }
      // console.log(response.data);
    } catch (error) {
      if (error.response.request.status === 401) {
        toastErrorNotify("You need access to perform this action");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h4"
        align="center"
        sx={{
          bgcolor: "white",
          borderRadius: "1rem",
          padding: "1rem",
          my: "1rem",
          boxShadow: 5,
        }}
      >
        Personal Create
      </Typography>

      <Grid
        item
        sx={{
          background: "white",
          borderRadius: "1rem",
          boxShadow: 5,
          p: 2,
        }}
      >
        <Container component="main">
          <CssBaseline />
          <Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {/* //!================================================ */}
              <FormControl sx={{ width: "100%", minWidth: "140", mt: 2 }}>
                <InputLabel>Title</InputLabel>
                <Select
                  id="title-select"
                  value={title}
                  variant="outlined"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  label="Title"
                >
                  <MenuItem value={"Team Lead"}>Team LEAD</MenuItem>
                  <MenuItem value={"Mid Lead"}>Mid LEAD</MenuItem>
                  <MenuItem value={"Junior"}>Junior</MenuItem>
                </Select>
              </FormControl>

              {/* //!================================================ */}
              <TextField
                fullWidth
                label="First Name"
                name="first_name"
                id="firstName"
                type="text"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Last Name"
                name="last_name"
                id="lastName"
                type="text"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {/* <FormControlLabel
                // fullWidth
                name="is_staff"
                control={<Checkbox />}
                onChange={(e) => setIsStaffed(e.target.value)}
                label="Is Staffed?"
              /> */}
              <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  label="gender"
                  id="gender-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <MenuItem value={"Female"}>Female</MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                  <MenuItem value={"Prefer Not Say"}>No prefer say</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Salary"
                id="salary"
                type="number"
                variant="outlined"
                InputProps={{ inputProps: { min: 1250 } }}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              {/* //!================================================ */}

              <Container>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{ width: { xs: "100%", md: "47%" } }}
                >
                  Create Personal
                </Button>
                <Button
                  size="large"
                  color="error"
                  variant="contained"
                  sx={{
                    marginLeft: { xs: "0", md: "2rem" },
                    marginTop: { xs: "1rem", md: "0" }, 
                    width: { xs: "100%", md: "45%" },
                  }}
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </Button>
              </Container>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Container>
  );
}
