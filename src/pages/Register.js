import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AuthContext } from "../contexts/AuthContext";
import { Link as RouterLink } from "react-router-dom";
const theme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  const { createUser} = React.useContext(AuthContext); 
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        sx={{ minHeight: { xs: "84.2vh", sm: "83vh" } }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/user/erondu/1600x900)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <CssBaseline />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              // my: 8,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                // marginTop: 6,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                minHeight: { xs: "92.2vh", sm: "91vh" },
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "darkslategray" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box
                sx={{
                  mt: 2,
                  width: "100%",
                }}
              >
                {/* //! FORMİK============== */}
                <Formik
                  initialValues={{
                    userName: "",
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                  }}
                  validationSchema={Yup.object().shape({
                    userName: Yup.string().required("Name is required"),
                    firstName: Yup.string().required("Name is required"),
                    lastName: Yup.string().required("Name is required"),
                    email: Yup.string()
                      .email("Email is invalid")
                      .required("Email is required"),
                    password: Yup.string()
                      .min(8, "Password should be at least 8 characters")
                      .max(16)
                      .matches(/\d+/, "Password should contain numbers")
                      .matches(
                        /[a-z]+/,
                        "Password should contain at least one lowercase letter."
                      )
                      .matches(
                        /[A-Z]+/,
                        "Password should contain at least one uppercase letter"
                      )
                      .required("Şifre gereklidir"),
                  })}
                  onSubmit={(values, actions) => {
                    actions.resetForm();
                    actions.setSubmitting(false);
                    createUser(
                      values.email,
                      values.password,
                      values.firstName,
                      values.lastName,
                      values.userName,
                      navigate
                    );
                  }}
                >
                  {({ values, handleChange, errors, touched, handleBlur }) => (
                    <Form>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 2,
                          // width:100%
                        }}
                      >
                        <TextField
                          fullWidth
                          label="User Name"
                          name="userName"
                          id="userName"
                          type="text"
                          variant="outlined"
                          value={values.userName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.userName && Boolean(errors.userName)}
                          helperText={touched.userName && errors.userName}
                        />
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          id="firstName"
                          type="text"
                          variant="outlined"
                          value={values.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={touched.firstName && errors.firstName}
                        />
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          id="lastName"
                          type="text"
                          variant="outlined"
                          value={values.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={touched.lastName && errors.lastName}
                        />
                        <TextField
                          fullWidth
                          label="Email"
                          name="email"
                          id="email"
                          type="email"
                          variant="outlined"
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.email && errors.email}
                          error={touched.email && Boolean(errors.email)}
                        />
                        <TextField
                          fullWidth
                          label="password"
                          name="password"
                          id="password"
                          type="password"
                          variant="outlined"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          helperText={touched.password && errors.password}
                          error={touched.password && Boolean(errors.password)}
                        />
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          fullWidth
                          sx={{
                            mt: 3,
                            mb: 2,
                            backgroundColor: "darkslategray",
                          }}
                        >
                          Register
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
                {/* //! FORMİK============== */}

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <RouterLink
                      to="/"
                      variant="body2"
                      component={RouterLink}
                      style={{ color: "darkslategray" }}
                    >
                      Already have an account? Sign in
                    </RouterLink>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
