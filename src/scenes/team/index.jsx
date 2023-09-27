import {
  Box,
  Typography,
  useTheme,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog,
  DialogContentText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Hidden,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useEffect } from "react";
import { deleteReports, getDetailReport, getReport } from "../../data/api";
import { useState, useRef } from "react";
import moment from "moment";
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [arrayId, setArrayId] = useState([]);
  const [singleId, setSingleId] = useState([]);
  const [deleteType, setDeleteType] = useState("");

  const [scroll, setScroll] = useState("paper");
  const [openDetail, setOpenDeatil] = useState(false);
  const [infoReport, setInfoReport] = useState({});
  const [infoFile, setInfoFile] = useState([]);
  const [numberFeature, setNumberFeature] = useState([]);

  const descriptionElementRef = useRef(null);

  const handleCloseDetail = () => {
    setOpenDeatil(false);
    setInfoFile([]);
    setInfoReport({});
  };

  const hanldeOpenDetail = async id => {
    try {
      const res = await getDetailReport(id);
      setInfoReport({
        ...res,
        exactFile:
          res.totalFile - Math.abs(res.dangerFileActual - res.dangerFile) * 2,
      });
      const arrayResult = res.result.map(i => i.split("*")[1]?.trim());
      let arrayFile = [];
      if (res.type == "detact-malware") {
        arrayFile = res.result.map(i =>
          i.split("^")[0].split("uploads")[1].slice(1).trim()
        );
      } else {
        arrayFile = res.result.map(i =>
          i.split("^")[0].split("test")[1].slice(1).trim()
        );
      }

      const newInfoFile = arrayFile.map((element, index) => {
        return {
          id: index + 1,
          file: element,
          status: arrayResult[index],
        };
      });

      setInfoFile(newInfoFile);

      const numberFeature = res.result
        .map(element => element.split("^")[1]?.trim())
        .map(element =>
          element
            .split("$")
            .filter(i => i != "\r\n")
            .filter(i => i != "")
            .map((element, index) => ({
              id: index + 1,
              key: element.split(":")[0],
              value: element.split(":")[1],
            }))
        );

      setNumberFeature(numberFeature);
    } catch (error) {
      console.log(error);
    }
    setOpenDeatil(true);
  };

  const columns = [
    { field: "id", headerName: "STT", flex: 2 },
    {
      field: "createdAt",
      headerName: "Ngày quét file",
      flex: 3,
      renderCell: row => {
        return (
          <Typography>
            {moment(row.row.createdAt)
              .locale("vi")
              .format("dddd, MMMM Do YYYY, h:mm:ss a")}
          </Typography>
        );
      },
    },
    {
      field: "timeScan",
      headerName: "Thời gian quét",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Trạng thái",
      flex: 1.5,
      renderCell: row => {
        return (
          <Box
            width="80%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.row.status == "Nguy hiểm"
                ? colors.redAccent[500]
                : colors.greenAccent[600]
            }
            borderRadius="4px"
          >
            <Typography color={colors.grey[100]} sx={{ cursor: "pointer" }}>
              {row.row.status}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "_id",
      headerName: "Hành động",
      flex: 2,
      renderCell: row => {
        return (
          <>
            <Box
              width="40%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.greenAccent[700]}
              borderRadius="4px"
              onClick={() => hanldeOpenDetail(row.row.id)}
            >
              <Typography color={colors.grey[100]} sx={{ cursor: "pointer" }}>
                Chi tiết
              </Typography>
            </Box>
            {/* <Box
              width="50%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.blueAccent[500]}
              borderRadius="4px"
            >
              <Typography color={colors.grey[100]} sx={{ cursor: "pointer" }}>
                Download đặc trưng
              </Typography>
            </Box> */}
            <Box
              width="40%"
              m="0 auto"
              p="5px"
              display="flex"
              justifyContent="center"
              backgroundColor={colors.redAccent[500]}
              borderRadius="4px"
              onClick={() => handleClickOpen(row.row._id)}
            >
              <Typography color={colors.grey[100]} sx={{ cursor: "pointer" }}>
                Xóa
              </Typography>
            </Box>
          </>
        );
      },
    },
  ];

  const handleClickOpen = (id, type) => {
    if (id) {
      setSingleId([id]);
    }
    if (type) {
      setDeleteType(type);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setSingleId([]);
    setArrayId([]);
    setOpen(false);
  };
  const deleteReport = async () => {
    if (deleteType) {
      await deleteReports({ arrayIdReport: arrayId });
      const newData = data.filter(i => !arrayId.includes(i.id));
      setData(newData);
    } else {
      await deleteReports({ arrayIdReport: singleId });
      const newData = data.filter(i => i.id !== singleId[0]);
      setData(newData);
    }
    handleClose();
  };

  useEffect(() => {
    const getReports = async () => {
      const res = await getReport();
      const newArray = res.map((i, index) => {
        const status = i.result
          .map(e => e.split("*")[1].trim())
          .includes("Nguy hiem")
          ? "Nguy hiểm"
          : "An toàn";
        return {
          ...i,
          id: i._id,
          status,
        };
      });
      setData(newArray);
    };
    getReports();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="BÁO CÁO"
        subtitle="Hãy kiểm tra lại lịch sử quét file của bạn"
      />

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
        <DataGrid
          checkboxSelection
          disableSelectionOnClick={true}
          onSelectionModelChange={row => {
            setArrayId(row);
          }}
          rows={data}
          columns={columns}
        />
      </Box>
      {/* Delete Multiple */}
      {arrayId.length > 1 && (
        <Box m="10px" display="flex" justifyContent="center" gap="20px">
          <Box
            p="5px"
            width="100px"
            backgroundColor={colors.redAccent[500]}
            borderRadius="4px"
            display="flex"
            justifyContent="center"
          >
            <Typography
              color={colors.grey[100]}
              sx={{ ml: "5px", cursor: "pointer" }}
              onClick={() => handleClickOpen(null, "Multi")}
            >
              Xóa lịch sử
            </Typography>
          </Box>
        </Box>
      )}

      {/* Popup delete */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Xóa Báo Cáo
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Bạn có chắc chắn muốn xóa báo cáo không ? Dữ liệu sẽ không khôi phục
            được !
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteReport()}
          >
            Đồng ý
          </Button>
          <Button variant="contained" color="success" onClick={handleClose}>
            Hủy
          </Button>
        </DialogActions>
      </BootstrapDialog>

      {/* Popup Detail */}
      <Dialog
        open={openDetail}
        onClose={handleCloseDetail}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Báo cáo chi tiết</DialogTitle>
        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ width: "500px" }}
          >
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                  Thông tin cơ bản
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box height="50vh">
                  <DataGrid
                    rows={[
                      {
                        id: 0,
                        name: "Loại quét",
                        value:
                          infoReport.type == "detact-malware"
                            ? "Quét trên Server"
                            : "Quét trong máy tính",
                      },
                      {
                        id: 1,
                        name: "Ngày quét",
                        value: moment(infoReport.createdAt)
                          .locale("vi")
                          .format("dddd, MMMM Do YYYY, h:mm:ss a"),
                      },
                      {
                        id: 2,
                        name: "Thời gian quét",
                        value: infoReport.timeScan,
                      },
                      {
                        id: 3,
                        name: "Số file đã quét",
                        value: infoReport.totalFile,
                      },
                      {
                        id: 4,
                        name: "Số file nguy hiểm",
                        value:
                          infoReport.dangerFile +
                          " " +
                          "(" +
                          (
                            (Number(infoReport.dangerFile) * 100) /
                            Number(infoReport.totalFile)
                          ).toFixed(2) +
                          "%" +
                          ")",
                      },
                      {
                        id: 5,
                        name: "Độ chính xác",
                        value:
                          (Number(infoReport.exactFile) * 100) /
                            Number(infoReport.totalFile) +
                          "%",
                      },
                    ]}
                    columns={[
                      { field: "name", headerName: "Thông số", flex: 1 },
                      { field: "value", headerName: "Giá trị", flex: 1 },
                    ]}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography color={colors.greenAccent[500]} variant="h5">
                  Thông tin các file đã quét
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box height="50vh">
                  <DataGrid
                    rows={infoFile}
                    columns={[
                      { field: "id", headerName: "STT", flex: 1 },
                      { field: "file", headerName: "File", flex: 6 },
                      {
                        field: "status",
                        headerName: "Trạng thái",
                        renderCell: row => {
                          return (
                            <Box
                              width="80%"
                              m="0 auto"
                              p="5px"
                              display="flex"
                              justifyContent="center"
                              backgroundColor={
                                row.row.status == "Nguy hiem"
                                  ? colors.redAccent[500]
                                  : colors.greenAccent[600]
                              }
                              borderRadius="4px"
                            >
                              <Typography
                                color={colors.grey[100]}
                                sx={{ cursor: "pointer" }}
                              >
                                {row.row.status == "Nguy hiem"
                                  ? "Nguy hiểm"
                                  : "An toàn"}
                              </Typography>
                            </Box>
                          );
                        },
                      },
                    ]}
                  />
                </Box>
              </AccordionDetails>
            </Accordion>
            {numberFeature?.map((element, index) => (
              <Accordion key={index}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography
                    color={colors.greenAccent[500]}
                    variant="h5"
                    sx={{ overflow: "hidden", maxWidth: "450px" }}
                  >
                    {element[0].value}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Box height="50vh">
                    <DataGrid
                      rows={element}
                      columns={[
                        { field: "key", headerName: "Thông số ", flex: 1 },
                        { field: "value", headerName: "Giá trị", flex: 2 },
                      ]}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Box
            p="8px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[500]}
            borderRadius="4px"
            onClick={handleCloseDetail}
          >
            <Typography color={colors.grey[100]} sx={{ cursor: "pointer" }}>
              Đóng
            </Typography>
          </Box>
        </DialogActions>
      </Dialog>
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

export default Team;
