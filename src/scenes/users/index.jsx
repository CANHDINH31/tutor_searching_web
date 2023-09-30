import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import { block, cash, getAllUser } from "../../libs/api";
import { userColumns } from "../../components/scenes/users/usersColumn";
import TableWrapper from "../../components/common/TableWrapper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { toast } from "react-toastify";
import AddMoney from "../../components/scenes/users/addMoney";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [openCash, setOpenCash] = useState(false);
  const [value, setValue] = useState(null);
  const [id, setId] = useState(null);

  const handleCashMoney = async () => {
    try {
      if (value) {
        await cash({ _id: id, money: Number(value) });
        setOpenCash(false);
        setId(null);
        setValue(null);
        toast.success("Nạp tiền thành công");
        fetchData();
      }
    } catch (error) {
      throw error;
    }
  };

  const hanldeToggleBlock = async (id, type) => {
    try {
      await block(id);
      if (type === 1) {
        toast.success("Mở khóa tài khoản thành công");
      } else {
        toast.success("Khóa tài khoản thành công");
      }

      fetchData();
    } catch (error) {
      throw error;
    }
  };

  const fetchData = async () => {
    const res = await getAllUser();
    const arrayData = res?.data?.map((e, index) => ({
      id: e._id,
      index: index + 1,
      ...e,
    }));
    setData(arrayData);
  };

  useEffect(() => {
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
          disableSelectionOnClick={true}
          rows={data}
          columns={userColumns(setId, setOpenCash, navigate, hanldeToggleBlock)}
        />
      </TableWrapper>
      <AddMoney
        open={openCash}
        setValue={setValue}
        handleClose={() => {
          setOpenCash(false);
          setId(null);
          setValue(null);
        }}
        handleOk={handleCashMoney}
      />
    </Box>
  );
};

export default Users;
