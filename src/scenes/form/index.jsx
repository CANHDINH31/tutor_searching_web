import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { multipleFilesUpload } from "../../data/api";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [contentMessage, setContentMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("success");
  const [openMessage, setOpenMessage] = useState(false);

  const [multipleFiles, setMultipleFiles] = useState("");
  const [multipleProgress, setMultipleProgress] = useState(0);
  const mulitpleFileOptions = {
    onUploadProgress: progressEvent => {
      const { loaded, total } = progressEvent;
      const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
      setMultipleProgress(percentage);
    },
  };

  const MultipleFileChange = e => {
    setMultipleFiles(e.target.files);
    setMultipleProgress(0);
  };

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
    }
    await multipleFilesUpload(formData, mulitpleFileOptions);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
    setTypeMessage("success");
    setContentMessage("");
  };

  return (
    <Box m="20px">
      {multipleProgress == 100 ? (
        <>
          <Header title="Upload File" subtitle="Upload file thành công" />
          <Box display="flex" justifyContent="center" gap="20px">
            <Box
              width="100px"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[500]}
              borderRadius="4px"
            >
              <a href={"/form"} style={{ textDecoration: "none" }}>
                <Typography
                  color={colors.grey[100]}
                  sx={{ ml: "5px", cursor: "pointer" }}
                >
                  Upload tiếp
                </Typography>
              </a>
            </Box>
            <Box
              p="5px"
              width="100px"
              backgroundColor={colors.blueAccent[500]}
              borderRadius="4px"
              display="flex"
              justifyContent="center"
            >
              <a href={"/invoices"} style={{ textDecoration: "none" }}>
                <Typography
                  color={colors.grey[100]}
                  sx={{ ml: "5px", cursor: "pointer" }}
                >
                  Danh sách file
                </Typography>
              </a>
            </Box>
          </Box>
        </>
      ) : (
        <>
          <Header title="UPLOAD FILE" subtitle="Hãy lưu trữ file lên server" />
          <Formik
            onSubmit={UploadMultipleFiles}
            initialValues={initialValues}
            validationSchema={checkoutSchema}
          >
            {({ values, errors, touched, handleBlur, handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <Box
                  display="grid"
                  gap="30px"
                  gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                  sx={{
                    "& > div": {
                      gridColumn: isNonMobile ? undefined : "span 4",
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    type="file"
                    onBlur={handleBlur}
                    onChange={e => MultipleFileChange(e)}
                    value={values.address2}
                    name="address2"
                    error={!!touched.address2 && !!errors.address2}
                    helperText={touched.address2 && errors.address2}
                    sx={{ gridColumn: "span 4" }}
                    inputProps={{
                      multiple: true,
                    }}
                  />
                </Box>
                {multipleProgress > 0 && (
                  <Box display="flex" justifyContent="center" mt="20px">
                    <div style={{ width: 80, height: 80 }}>
                      <CircularProgressbar
                        value={multipleProgress}
                        text={`${multipleProgress}%`}
                      />
                    </div>
                  </Box>
                )}

                <Box
                  display="flex"
                  justifyContent="center"
                  mt="20px"
                  onClick={UploadMultipleFiles}
                >
                  <Button type="submit" color="secondary" variant="contained">
                    Upload File
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </>
      )}

      {/* Message  */}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={openMessage}
          autoHideDuration={6000}
          onClose={handleCloseMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseMessage}
            severity={typeMessage}
            sx={{ width: "100%", fontSize: "14px" }}
          >
            {contentMessage}
          </Alert>
        </Snackbar>
      </Stack>
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  file: yup.string().required("Chưa upload file"),
});
const initialValues = {
  file: "",
};

export default Form;
