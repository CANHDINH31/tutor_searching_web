import React, { useState } from "react";
import {
  Box,
  Button,
  useTheme,
  Stack,
  LinearProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { scanMultiFile, createReport } from "../../data/api";
import "react-circular-progressbar/dist/styles.css";
import { convertTime } from "../../data/helper";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const pythonScript = "D:/phathienmadoc/API/test.py";

  const [multipleFiles, setMultipleFiles] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentMessage, setContentMessage] = useState("");
  const [typeMessage, setTypeMessage] = useState("success");
  const [openMessage, setOpenMessage] = useState(false);

  const MultipleFileChange = e => {
    setMultipleFiles(e.target.files);
  };

  const scanFolder = async () => {
    const arrayFile = [...multipleFiles];
    const newArray = arrayFile.map(
      i => "D:/phathienmadoc/examplevirus/" + i.webkitRelativePath
    );
    const dangerFileActual = arrayFile
      .map(e => e.webkitRelativePath)
      .filter(e => e.includes("VirusShare")).length;

    setLoading(true);

    try {
      const timeStart = Date.now();
      const res = await scanMultiFile({ pythonScript, fileDes: newArray });
      const timeEnd = Date.now();
      const arrCheckvalue = res.map(i => i.stdout.split("*")[1].trim());

      await createReport({
        type: "scan-location",
        timeScan: convertTime((timeEnd - timeStart) / 1000),
        result: res.map(e => e.stdout),
        totalFile: arrCheckvalue.length,
        dangerFile: arrCheckvalue.filter(x => x === "Nguy hiem").length,
        dangerFileActual,
      });

      if (!arrCheckvalue.includes("Nguy hiem")) {
        setContentMessage(
          "Tất cả các file đều an toàn. Để biết thêm thông tin hãy vào phần báo cáo."
        );
        setTypeMessage("success");
        setOpenMessage(true);
      } else {
        setContentMessage(
          "Phát hiện mối nguy hiểm. Để biết thêm thông tin hãy vào phần báo cáo."
        );
        setTypeMessage("error");
        setOpenMessage(true);
      }
    } catch (error) {
      setContentMessage("Hệ thống bị lỗi. Vui lòng quét lại !");
      setTypeMessage("error");
      setOpenMessage(true);
    }
    setLoading(false);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  return (
    <Box m="20px">
      <Header title="QUÉT THƯ MỤC" subtitle="Hãy đưa thư mục lên để quét" />
      {loading ? (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          <LinearProgress color="success" />
        </Stack>
      ) : (
        <Formik initialValues={initialValues} validationSchema={checkoutSchema}>
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
                <input
                  onChange={e => MultipleFileChange(e)}
                  directory=""
                  webkitdirectory=""
                  type="file"
                />
              </Box>

              <Box display="flex" justifyContent="center" mt="20px">
                <Button
                  type="submit"
                  color="secondary"
                  variant="contained"
                  onClick={scanFolder}
                >
                  Quét Thư Mục
                </Button>
              </Box>
            </form>
          )}
        </Formik>
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
  file: yup.string().required("Chưa chọn thư mục"),
});
const initialValues = {
  file: "",
};

export default Form;
