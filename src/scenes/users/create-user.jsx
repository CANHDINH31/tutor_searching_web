import {
  Box,
  Button,
  RadioGroup,
  TextField,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/layout/Header";
import { register } from "../../libs/api/auth";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    await register({
      ...values,
      role: Number(values.role),
      gender: Number(values.gender),
    });
    navigate("/users");
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name="name"
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.email}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Phone"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.phone}
                name="phone"
                error={!!touched.phone && !!errors.phone}
                helperText={touched.phone && errors.phone}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                label="Birthday"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.date_of_birth}
                name="date_of_birth"
                error={!!touched.date_of_birth && !!errors.date_of_birth}
                helperText={touched.date_of_birth && errors.date_of_birth}
                sx={{ gridColumn: "span 2" }}
              />
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={Number(1)}
                  control={<Radio color="success" />}
                  label="Male"
                />
                <FormControlLabel
                  value={Number(2)}
                  control={<Radio color="success" />}
                  label="Female"
                />
              </RadioGroup>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={values.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={Number(1)}
                  control={<Radio color="success" />}
                  label="Student"
                />
                <FormControlLabel
                  value={Number(2)}
                  control={<Radio color="success" />}
                  label="Tutor"
                />
              </RadioGroup>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Thêm mới User
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Không được để trống"),
  username: yup.string().required("Không được để trống"),
  email: yup.string().required("Không được để trống"),
  password: yup.string().required("Không được để trống"),
});
const initialValues = {
  name: "",
  username: "",
  email: "",
  password: "",
  gender: 1,
  role: 1,
};

export default CreateUser;
