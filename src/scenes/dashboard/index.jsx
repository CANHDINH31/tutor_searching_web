import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import PercentIcon from "@mui/icons-material/Percent";
import { useState } from "react";
import { useEffect } from "react";
import Header from "../../components/layout/Header";
import StatBox from "../../components/common/StatBox";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import Diversity1OutlinedIcon from "@mui/icons-material/Diversity1Outlined";
import DesignServicesOutlinedIcon from "@mui/icons-material/DesignServicesOutlined";
import { getAllSubject, statis } from "../../libs/api";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState(null);
  const [data1, setData1] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await statis();
        const res_subject = await getAllSubject();
        setData1(res_subject?.data?.data?.length);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="THỐNG KÊ" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.count_student}
            subtitle="Số học viên"
            icon={
              <SchoolOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.count_tutor}
            subtitle="Số giảng viên"
            icon={
              <DesignServicesOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data1}
            subtitle="Số môn học"
            icon={
              <LibraryBooksOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 6"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.count_schedule}
            subtitle="Số lớp được tạo"
            icon={
              <Diversity1OutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
