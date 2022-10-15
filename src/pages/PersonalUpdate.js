import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { PersonalContext } from '../contexts/PersonalContext';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import { Container } from "@mui/material";
import { useContext, useState } from "react";

export default function PersonalUpdate() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state;
  const { userId } = useParams();
  const { myKey,url } = useContext(AuthContext);
  const [firstName, setFirstName] = useState(userData.first_name);
  const [lastName, setLastName] = useState(userData.last_name);
  const [isStaffed, setIsStaffed] = useState(userData.is_staffed);
  const [title, setTitle] = useState(userData.title);
  const [gender, setGender] = useState(userData.gender);
  const [salary, setSalary] = useState(userData.salary);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // getUserDetail();
    try {
      let headersList = {
        Accept: "*/*",
        Authorization: `Token ${myKey}`,
        "Content-Type": "application/json",
      };
      let bodyContent = JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        is_staffed: isStaffed,
        title: title,
        gender: gender,
        salary: salary,
      });

      let reqOptions = {
        url: `${url}api/personal/${userId}/`,
        method: "PUT",
        headers: headersList,
        data: bodyContent,
      };
      // console.log(reqOptions);

      let response = await axios.request(reqOptions);
      if (response.status === 200) {
        toastSuccessNotify("Personal succesfully updated!");
        navigate(-1);
      }
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
        Personal Update
      </Typography>

      <Grid
        item
        sx={{
          background: "white",
          borderRadius: "1rem",
          boxShadow: 5,
          p: 2,
          my:3 
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
                  value={title || ""}
                  variant="outlined"
                  type="text"
                  label="Title"
                  onChange={(e) => setTitle(e.target.value)}
                  required
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
                value={firstName || ""}
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
                value={lastName || ""}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {/* <FormControlLabel
                name="is_staff"
                // control={<Checkbox checked={isStaffed} />}
                control={<Checkbox />}
                // checked={isStaffed}
                onChange={(e) => setIsStaffed(e.target.value)}
                label="Is Staffed?"
              /> */}
              <FormControl fullWidth>
                <InputLabel id="is_staff-select-label">Is Staff</InputLabel>
                <Select
                  label="isStaff"
                  id="isStaff-select"
                  value={isStaffed}
                  onChange={(e) => setIsStaffed(e.target.value)}
                  required
                >
                  <MenuItem value={"true"}>True</MenuItem>
                  <MenuItem value={"false"}>False</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="gender-select-label">Gender</InputLabel>
                <Select
                  label="gender"
                  id="gender-select"
                  value={gender || ""}
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
                value={salary || ""}
                onChange={(e) => setSalary(e.target.value)}
                required
              />
              {/* //!================================================ */}
              {/* <div style={{display:'flex',justifyContent:'center'}}> */}
              <Container >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{ width: { xs: "100%", md: "45%" } }}
                >
                  Submit Change
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
                  Cancel Change
                </Button>
              </Container>
            </Box> 
          </Box>
        </Container>
      </Grid>
    </Container>
  );
}
