import {
  Box,
  Typography,
  useTheme,
  Stack,
  LinearProgress,
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useState } from "react";
import { useEffect } from "react";
import {
  getMultipleFiles,
  deleteFiles,
  scanFiles,
  scanMultiFile,
  createReport,
} from "../../data/api";
import { convertTime } from "../../data/helper";

const Invoices = () => {
  const pythonScript = "D:/phathienmadoc/API/test.py";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);
  const [arrayId, setArrayId] = useState([]);
  const [fileDetele, setFileDelete] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [openMulti, setOpenMulti] = useState(false);
  const [typeMessage, setTypeMessage] = useState("success");
  const [contentMessage, setContentMessage] = useState("");

  const handleClickOpen = file => {
    setOpen(true);
    setFileDelete(file);
  };
  const handleClose = () => {
    setOpen(false);
    setFileDelete("");
  };

  const handleClickOpenMulti = file => {
    setOpenMulti(true);
  };
  const handleCloseMulti = () => {
    setOpenMulti(false);
  };

  const columns = [
    { field: "id", headerName: "Id", flex: 2 },
    {
      field: "fileName",
      headerName: "File",
      flex: 5,
      cellClassName: "name-column--cell",
    },
    {
      field: "fileSize",
      headerName: "Size",
      flex: 1,
    },
    {
      field: "fileType",
      headerName: "Loại",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Hành động",
      flex: 3,
      renderCell: row => {
        return (
          <>
            <Box
              width="30%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[700]}
              borderRadius="4px"
              onClick={() => scanFile(row.row.filePath)}
            >
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px", cursor: "pointer" }}
              >
                Kiểm tra
              </Typography>
            </Box>
            <Box
              width="30%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.blueAccent[500]}
              borderRadius="4px"
            >
              <a
                href={"http://localhost:8080/" + row.row.filePath}
                style={{ textDecoration: "none" }}
                target="_blank"
              >
                <Typography
                  color={colors.grey[100]}
                  sx={{ ml: "5px", cursor: "pointer" }}
                >
                  Download
                </Typography>
              </a>
            </Box>
            <Box
              width="30%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[500]}
              borderRadius="4px"
            >
              <Typography
                color={colors.grey[100]}
                sx={{ ml: "5px", cursor: "pointer" }}
                onClick={() => handleClickOpen(row.row.filePath)}
              >
                Xóa
              </Typography>
            </Box>
          </>
        );
      },
    },
  ];

  const deleteFile = async () => {
    await deleteFiles({ arrayFile: [fileDetele] });
    const newData = data.filter(i => i.filePath !== fileDetele);
    setData(newData);
    handleClose();
  };

  const scanFile = async file => {
    setLoading(true);
    const newFile = "D:/phathienmadoc/web/phathienmadoc/serverproject/" + file;
    const timeStart = Date.now();
    const { stdout } = await scanFiles({ pythonScript, fileDes: newFile });
    const timeEnd = Date.now();
    await createReport({
      timeScan: convertTime((timeEnd - timeStart) / 1000),
      result: [stdout],
      totalFile: 1,
      dangerFile: stdout.split("*")[1].toString().trim() == "An toan" ? 0 : 1,
      dangerFileActual: file.includes("VirusShare") ? 1 : 0,
    });
    if (stdout.split("*")[1].toString().trim() == "An toan") {
      setContentMessage(
        "File an toàn. Để biết thêm thông tin hãy vào phần báo cáo."
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
    setLoading(false);
  };

  const hanldeDeleteMultiFile = async () => {
    const newArray = data
      .filter(e => arrayId.includes(e.id))
      .map(i => i.filePath);
    await deleteFiles({ arrayFile: newArray });
    const newData = data.filter(i => !newArray.includes(i.filePath));
    setData(newData);
    handleCloseMulti();
  };

  // scan multifile use call api scan a file
  // const hanldeScanMultiFile = async () => {
  //   setLoading(true);
  //   const newArray = data
  //     .filter((e) => arrayId.includes(e.id))
  //     .map(
  //       (i) => "D:/phathienmadoc/web/phathienmadoc/serverproject/" + i.filePath
  //     );
  //   const scanFilePromiseAll = newArray.map((element) =>
  //     scanFiles({ pythonScript, fileDes: element })
  //   );
  //   try {
  //     const arrData = await Promise.all(scanFilePromiseAll);

  //     const arrCheckvalue = arrData.map((i) => {
  //       const result = i.stdout.split("*")[1].trim();
  //       return result;
  //     });
  //     console.log(arrCheckvalue);

  //     if (!arrCheckvalue.includes("Nguy hiem")) {
  //       setContentMessage(
  //         "Tất cả các file đều an toàn. Để biết thêm thông tin hãy vào phần báo cáo."
  //       );
  //       setTypeMessage("success");
  //       setOpenMessage(true);
  //     } else {
  //       setContentMessage(
  //         "Phát hiện mối nguy hiểm. Để biết thêm thông tin hãy vào phần báo cáo."
  //       );
  //       setTypeMessage("error");
  //       setOpenMessage(true);
  //     }
  //   } catch (error) {
  //     setContentMessage("Hệ thống bị lỗi. Vui lòng quét lại !");
  //     setTypeMessage("error");
  //     setOpenMessage(true);
  //   }
  //   setLoading(false);
  // };
  const hanldeScanMultiFile = async () => {
    const newArray = data
      .filter(e => arrayId.includes(e.id))
      .map(
        i => "D:/phathienmadoc/web/phathienmadoc/serverproject/" + i.filePath
      );
    const dangerFileActual = data
      .filter(e => arrayId.includes(e.id))
      .map(e => e.fileName)
      .filter(e => e.includes("VirusShare")).length;

    setLoading(true);

    try {
      const timeStart = Date.now();
      const res = await scanMultiFile({ pythonScript, fileDes: newArray });
      const timeEnd = Date.now();
      const arrCheckvalue = res.map(i => i.stdout.split("*")[1].trim());

      await createReport({
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

  const handleClickMessage = () => {
    setOpenMessage(true);
  };

  const handleCloseMessage = () => {
    setOpenMessage(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await getMultipleFiles();
      const arrayData = res.map(e => ({ id: e._id, ...e }));
      setData(arrayData);
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="FILES" subtitle="Danh sách file đã upload" />
      <Box
        m="40px 0 0 0"
        height="70vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        {loading && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="success" />
          </Stack>
        )}
        <DataGrid
          checkboxSelection
          disableSelectionOnClick={true}
          rows={data}
          columns={columns}
          onSelectionModelChange={row => {
            setArrayId(row);
          }}
        />
        {loading && (
          <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
            <LinearProgress color="success" />
          </Stack>
        )}
      </Box>
      {arrayId.length > 1 && (
        <Box m="10px" display="flex" justifyContent="center" gap="20px">
          <Box
            width="100px"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[700]}
            borderRadius="4px"
            onClick={hanldeScanMultiFile}
          >
            <Typography
              color={colors.grey[100]}
              sx={{ ml: "5px", cursor: "pointer" }}
            >
              Kiểm tra
            </Typography>
          </Box>
          <Box
            p="5px"
            width="100px"
            backgroundColor={colors.redAccent[500]}
            borderRadius="4px"
            display="flex"
            justifyContent="center"
            // onClick={hanldeDeleteMultiFile}
            onClick={handleClickOpenMulti}
          >
            <Typography
              color={colors.grey[100]}
              sx={{ ml: "5px", cursor: "pointer" }}
            >
              Xóa
            </Typography>
          </Box>
        </Box>
      )}
      {/* Delete Only File */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Xóa File
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Bạn có chắc chắn muốn xóa file không ? Dữ liệu sẽ không khôi phục
            được !
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" onClick={deleteFile}>
            Đồng ý
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* Delete Multi File */}
      <BootstrapDialog
        onClose={handleClickOpenMulti}
        aria-labelledby="customized-dialog-title"
        open={openMulti}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseMulti}
        >
          Xóa Nhiều File
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Bạn có chắc chắn muốn xóa những file này không ? Dữ liệu sẽ không
            khôi phục được !
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={hanldeDeleteMultiFile}
          >
            Đồng ý
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={handleCloseMulti}
          >
            Hủy
          </Button>
        </DialogActions>
      </BootstrapDialog>

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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default Invoices;