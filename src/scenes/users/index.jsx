import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getAllUser } from "../../libs/api";
import { userColumns } from "../../components/scenes/users/usersColumn";
import TableWrapper from "../../components/common/TableWrapper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Users = () => {
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
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button variant="contained" color="info" href="/create-user">
          <Box display={"flex"} alignItems={"center"} gap={1}>
            <AddCircleOutlineOutlinedIcon />
            <Typography>Thêm mới user</Typography>
          </Box>
        </Button>
      </Box>
      <TableWrapper>
        <DataGrid
          checkboxSelection
          disableSelectionOnClick={true}
          rows={data}
          columns={userColumns}
          onSelectionModelChange={(row) => {
            setArrayId(row);
          }}
        />
      </TableWrapper>
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
