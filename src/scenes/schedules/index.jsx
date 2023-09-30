import { Box, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/layout/Header";
import { useState } from "react";
import { useEffect } from "react";
import { getAllSchedule } from "../../libs/api/schedule";
import moment from "moment";
import { convertKey, convertValues } from "../../libs/helpers";

const Users = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getAllSchedule();
    const arrayData = res?.data
      ?.map((obj) => {
        const {
          subject_id,
          tutor_id,
          student_id,
          is_accepted,
          price,
          num_sessions,
          time,
          createdAt,
        } = obj;
        return {
          subject_id: subject_id ? subject_id.name : null,
          tutor_id: tutor_id ? tutor_id.name : null,
          student_id: student_id ? student_id.name : null,
          price,
          num_sessions,
          time,
          is_accepted: is_accepted ? "Hết lớp" : "Còn lớp",
          createdAt: moment(createdAt).format("DD-MM-YYYY"),
        };
      })
      ?.map((obj) => {
        const keys = Object.keys(obj);
        const result = keys.map((key, index) => {
          if (key == "time") {
            return {
              id: index,
              name: convertKey(key),
              value: convertValues(obj[key])?.join("\n"),
            };
          } else {
            return {
              id: index,
              name: convertKey(key),
              value: obj[key] ?? "Không có dữ liệu",
            };
          }
        });
        return result;
      });
    setData(arrayData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "name",
      flex: 1,
      editable: false,
    },
    {
      field: "value",
      flex: 2,
      editable: false,
    },
  ];

  console.log(data);

  return (
    <Box m="20px">
      <Header title="SCHEDULES" subtitle="" />
      <Grid container spacing={4}>
        {data?.map((sub, index) => (
          <Grid item xs={4} key={index}>
            <Box sx={{ height: "400px", width: "100%" }}>
              <DataGrid
                rows={sub}
                columns={columns}
                headerHeight={0}
                hideFooter={true}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
