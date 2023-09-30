import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import TableWrapper from "../../components/common/TableWrapper";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { toast } from "react-toastify";
import { subjectsColumns } from "../../components/scenes/subject/subjectsColumn";
import {
  addSubject,
  getAllSubject,
  removeSubject,
  updateSubject,
} from "../../libs/api";
import AddSubject from "../../components/scenes/subject/addSubject";
import UpdateSubject from "../../components/scenes/subject/updateSubject";
import ConfirmDelete from "../../components/common/ConfirmDelete";

const Subject = () => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState(null);
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [remove, setRemove] = useState(false);

  const handleCloseAdd = () => {
    setAdd(false);
    setValue(null);
  };

  const hanldeCloseUpdateSubject = () => {
    setName("");
    setUpdate(false);
    setId("");
  };

  const handleUpdateSubject = async () => {
    try {
      await updateSubject(id, { name });
      hanldeCloseUpdateSubject();
      toast.success("Cập nhật môn học thành công");
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  const handleCloseRemove = () => {
    setRemove(false);
    setId("");
  };

  const handleRemoveSubject = async () => {
    try {
      await removeSubject(id);
      toast.success("Xóa môn học thành công");
      handleCloseRemove();
      fetchData();
    } catch (error) {
      throw error;
    }
  };

  const handleAddSubject = async () => {
    if (value) {
      await addSubject({ name: value });
      handleCloseAdd();
      fetchData();
      toast.success("Thêm mới môn học thành công");
    }
  };

  const fetchData = async () => {
    const res = await getAllSubject();
    const arrayData = res?.data?.data?.map((e, index) => ({
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
    <>
      <Box m="20px">
        <Header title="SUBJECTS" subtitle="Danh sách môn học" />
        <Box display={"flex"} justifyContent={"flex-end"}>
          <Button variant="contained" color="info" onClick={() => setAdd(true)}>
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <AddCircleOutlineOutlinedIcon />
              <Typography>Thêm mới môn học</Typography>
            </Box>
          </Button>
        </Box>
        <TableWrapper>
          <DataGrid
            disableSelectionOnClick={true}
            rows={data}
            columns={subjectsColumns(setUpdate, setId, setName, setRemove)}
          />
        </TableWrapper>
      </Box>
      <AddSubject
        open={add}
        handleClose={handleCloseAdd}
        handleOk={handleAddSubject}
        setValue={setValue}
      />
      <UpdateSubject
        open={update}
        value={name}
        setValue={setName}
        handleClose={hanldeCloseUpdateSubject}
        handleOk={handleUpdateSubject}
      />

      <ConfirmDelete
        open={remove}
        handleClose={handleCloseRemove}
        handleOk={handleRemoveSubject}
      />
    </>
  );
};

export default Subject;
