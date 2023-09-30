import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import { cash, deleteUser, getAllUser } from "../../libs/api";
import { userColumns } from "../../components/scenes/users/usersColumn";
import TableWrapper from "../../components/common/TableWrapper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ConfirmDelete from "../../components/common/ConfirmDelete";
import { toast } from "react-toastify";
import AddMoney from "../../components/scenes/users/addMoney";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [arrayId, setArrayId] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCash, setOpenCash] = useState(false);
  const [value, setValue] = useState(null);
  const [id, setId] = useState(null);

  const handleDeleteUser = async () => {
    await deleteUser({ list_id: arrayId });
    setOpen(false);
    setData(data?.filter((e) => !arrayId.includes(e._id)));
    toast.success("Xóa user thành công");
  };

  const handleCashMoney = async () => {
    try {
      await cash({ _id: id, money: Number(value) });
      setOpenCash(false);
      setId(null);
      setValue(null);
      toast.success("Nạp tiền thành công");
      const res = await getAllUser();
      const arrayData = res?.data?.map((e, index) => ({
        id: e._id,
        index: index + 1,
        ...e,
      }));
      setData(arrayData);
    } catch (error) {
      throw error;
    }
  };
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
          columns={userColumns(
            setArrayId,
            setOpen,
            setId,
            setOpenCash,
            navigate
          )}
          onSelectionModelChange={(row) => {
            setArrayId(row);
          }}
        />
      </TableWrapper>
      {arrayId.length > 1 && (
        <Box m="10px" display="flex" justifyContent="center">
          <Button
            color="error"
            variant="contained"
            onClick={() => setOpen(true)}
          >
            Xóa các mục đã chọn
          </Button>
        </Box>
      )}
      <ConfirmDelete
        open={open}
        handleClose={() => setOpen(false)}
        handleOk={handleDeleteUser}
      />
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
