import { Box, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUser } from "../../libs/api";
import { userColumns } from "../../components/users/usersColumn";

const Users = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [arrayId, setArrayId] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAllUser();
      const arrayData = res?.data?.map((e, index) => ({
        id: e._id,
        index: index + 1,
        ...e,
      }));
      setData(arrayData);
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="USERS" subtitle="Danh sách users" />
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
          rows={data}
          columns={userColumns}
          onSelectionModelChange={(row) => {
            setArrayId(row);
          }}
        />
      </Box>
      {arrayId.length > 1 && (
        <Box m="10px" display="flex" justifyContent="center">
          <Button color="error" variant="contained">
            Xóa các mục đã chọn
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Users;
