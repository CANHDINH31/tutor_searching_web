import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import WifiTetheringIcon from "@mui/icons-material/WifiTethering";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import PercentIcon from "@mui/icons-material/Percent";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";

import { useState } from "react";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [reportStatistic, setReportStatictis] = useState(null);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="THỐNG KÊ " subtitle="Chào mừng bạn đến với hệ thống" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        {reportStatistic != null && (
          <>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={reportStatistic.numberFile}
                subtitle="File Upload"
                icon={
                  <CloudDownloadIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={reportStatistic?.totalFile[0]?.count}
                subtitle="Số file quét"
                icon={
                  <WifiTetheringIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={
                  reportStatistic?.dangerFile[0]?.count +
                  " (" +
                  (
                    (reportStatistic?.dangerFile[0]?.count * 100) /
                    reportStatistic?.totalFile[0]?.count
                  ).toFixed(2) +
                  " %)"
                }
                subtitle="Số file nguy hiểm"
                icon={
                  <ReportGmailerrorredIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
            <Box
              gridColumn="span 3"
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <StatBox
                title={
                  (
                    ((reportStatistic?.totalFile[0]?.count -
                      Math.abs(
                        reportStatistic?.dangerFile[0]?.count -
                          reportStatistic?.dangerFileActual[0]?.count
                      ) *
                        2 -
                      0.5) *
                      100) /
                    reportStatistic?.totalFile[0]?.count
                  ).toFixed(2) + " %"
                }
                subtitle="Độ chính xác"
                icon={
                  <PercentIcon
                    sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                  />
                }
              />
            </Box>
          </>
        )}

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" fontWeight="600">
            Video Upload File
          </Typography>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="4px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h5" fontWeight="600">
            Video Quét File
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
