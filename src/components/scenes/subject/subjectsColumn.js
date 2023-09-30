import { Box, Button } from "@mui/material";
import moment from "moment";
export const subjectsColumns = (setUpdate, setId, setName, setRemove) => {
  return [
    {
      field: "index",
      headerName: "STT",
      width: 100,
    },
    {
      field: "name",
      headerName: "Môn học",
      width: 200,
    },
    {
      field: "createdAt",
      headerName: "Thời gian tạo",
      width: 200,
      renderCell: (row) => {
        return moment(row?.row?.createdAt).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      field: "updatedAt",
      headerName: "Thời gian cập nhật",
      width: 200,
      renderCell: (row) => {
        return moment(row?.row?.updatedAt).format("DD-MM-YYYY HH:mm:ss");
      },
    },
    {
      field: "accessLevel",
      headerName: "Hành động",
      width: 300,
      renderCell: (row) => {
        return (
          <Box display={"flex"} alignItems={"center"} gap={2}>
            <Button
              color="success"
              variant="contained"
              size="small"
              onClick={() => {
                setUpdate(true);
                setId(row?.row?._id);
                setName(row?.row?.name);
              }}
            >
              Cập nhật
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => {
                setRemove(true);
                setId(row?.row?._id);
              }}
            >
              Xóa
            </Button>
          </Box>
        );
      },
    },
  ];
};
