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
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { changeInfo, getInfoUser } from "../../libs/api/user";
import { toast } from "react-toastify";

const ChangeInfo = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { id } = useParams();

  const [initialValues, setInitialValues] = useState({
    name: "",
    phone: "",
    gender: null,
    date_of_birth: "",
  });

  const handleFormSubmit = async (values) => {
    await changeInfo({
      _id: id,
      ...values,
      gender: Number(values.gender),
    });
    toast.success("Cập nhật thông tin thành công");
    navigate("/");
  };

  useEffect(() => {
    const getInfo = async (id) => {
      const res = await getInfoUser(id);
      setInitialValues({
        name: res?.data?.name,
        gender: Number(res?.data?.gender),
        phone: res?.data?.phone,
        date_of_birth: res?.data?.date_of_birth,
      });
    };
    getInfo(id);
  }, [id]);
  return (
    <Box m="20px">
      <Header title="UPDATE USER" subtitle="Update Info User" />

      <Formik
        enableReinitialize={true}
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
                type="text"
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
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Cập nhật User
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
});

export default ChangeInfo;
