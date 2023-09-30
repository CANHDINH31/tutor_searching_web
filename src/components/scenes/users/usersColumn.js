import { Box, Button } from "@mui/material";
export const userColumns = (
  setArrayId,
  setOpen,
  setId,
  setOpenCash,
  navigate
) => {
  return [
    { field: "index", headerName: "STT", width: 50 },
    {
      field: "username",
      headerName: "Username",
      width: 120,
    },
    {
      field: "email",
      headerName: "Email",
      width: 180,
    },
    {
      field: "date_of_birth",
      headerName: "Ngày sinh",
      width: 80,
    },
    {
      field: "gender",
      headerName: "Giới tính",
      width: 70,
      renderCell: (row) => {
        return (
          <span>
            {row.row?.gender === 1 ? "Nam" : row.row?.gender === 2 ? "Nữ" : ""}
          </span>
        );
      },
    },

    {
      field: "phone",
      headerName: "Số điện thoại",
      width: 100,
    },
    {
      field: "money",
      headerName: "Số dư",
      width: 80,
    },
    {
      field: "role",
      headerName: "Vai trò",
      renderCell: (row) => {
        return (
          <Button
            variant="contained"
            color={row?.row?.role === 1 ? "warning" : "secondary"}
            size="small"
          >
            {row?.row?.role === 1 ? "Học viên" : "Gia sư"}
          </Button>
        );
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
              onClick={() => navigate(`/users/${row.row._id}`)}
            >
              Cập nhật
            </Button>
            <Button
              color="info"
              variant="contained"
              size="small"
              onClick={() => {
                setId(row.row._id);
                setOpenCash(true);
              }}
            >
              Nạp tiền
            </Button>
            <Button
              color="error"
              variant="contained"
              size="small"
              onClick={() => {
                setArrayId([row?.row?.id]);
                setOpen(true);
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
