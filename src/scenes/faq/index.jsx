import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import Iframe from "react-iframe";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="GIỚI THIỆU" subtitle="Phát triển mã độc Windows" />
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Phần mềm
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Dưới sự phát triển nhanh chóng của mã độc cả về độ phức tạp và số
            lượng, không gian mạng trở nên nóng hơn bao giờ hết. Các nhà phân
            tích và nghiên cứu mã độc không thể áp dụng đơn điệu các kỹ thuật
            phân tích cơ bản. Hiện tại đã có rất nhiều giải pháp tích cực như:
            sandbox, virustotal, … các giải pháp này mang lại tính hiệu quả rất
            cao, nhưng thay vào đó là phụ thuộc quá nhiều vào các hãng chống
            phần mềm độc hại. Đối với các mẫu mã độc mới xuất hiện hay các loại
            mã độc của các cuộc tấn công có chủ đích (APT) thì những giải pháp
            trên chưa thực sự tốt. Và quan trọng hơn là mỗi đơn vị nghiên cứu
            giải pháp chống mã độc luôn phải tự phát triển giải pháp riêng của
            mình song song với việc ứng dụng các dịch vụ của bên thứ ba. Bên
            cạnh đó xu thế tương lai là học sâu và trí tuệ nhân tạo có tính ứng
            dụng rất lớn. Để giảm thời gian phân tích mã độc, tăng tính hiệu
            quả, mã độc cần được phát hiện một cách tự động và nhanh chóng.
            <br />
            Phương pháp học sâu đóng một vai trò quan trọng trong việc phát hiện
            mã độc tự động. Nhiệm vụ thách thức nhất là chọn một bộ đặc trưng
            phù hợp từ một tập dữ liệu lớn để có thể xây dựng mô hình phân loại
            trong thời gian ngắn hơn với độ chính xác cao hơn. Mục đích của công
            việc này trước hết là để thử nghiệm đánh giá, xem xét tổng thể các
            phương pháp phân loại, Tutor searching và thứ hai là phát triển một
            hệ thống tự động để Tutor searching dựa trên PE Header các file thực
            thi (EXE, DLL) với độ chính xác cao và thời gian thực hiện nhanh
            chóng.
            <br />
            Để thực hiện, nhóm đã thu thập một tập 50,000 file thực thi EXE đa
            dạng, gồm 40,000 file mã độc và 10,000 file sạch. Nhóm thực hiện
            phân tích các thông tin từ PE Header. Tiếp theo là thực hiện khảo
            sát thống kê và lựa chọn thông tin đặc trưng quan trọng từ PE
            Header. Sau đó áp dụng học sâu để phân loại và Tutor searching. Cuối
            cùng là tiến hành thử nghiệm và so sánh kết quả nghiên cứu so với
            các kết quả hiện hành.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Thành viên
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            &#9679; Ths. Lê Đức Thuận - Giáo viên hướng dẫn
            <br />
            &#9679; Phạm Cảnh Dinh - CT4A - CT040110 - 0397677583
            <br />
            &#9679; Trần Đức Long - CT4A - CT040129 - 0399666999
            <br />
            &#9679; Nguyễn Văn Hùng - CT4A - CT040122 - 0399666999
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Tính năng
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            &#9679; Upload & Lưu trữ File
            <br />
            &#9679; Kiểm tra File & Thư Mục
            <br />
            &#9679; Thống kê & Báo cáo
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Hướng phát triển
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            &#9679; Lên lịch quét tự động
            <br />
            &#9679; Triển khai trên server thực tế
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Bản Word
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ height: "100vh" }}>
          <Iframe
            url={
              "https://firebasestorage.googleapis.com/v0/b/lms-education-8bb9c.appspot.com/o/document%2Fword.pdf-1676131634159?alt=media&token=a92537b5-f797-4d3c-835d-1bfaa58f5939"
            }
            width="100%"
            height="100%"
            id=""
            className=""
            display="block"
          />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
            Bản PowerPoint
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{ height: "100vh" }}>
          <Iframe
            url={
              "https://firebasestorage.googleapis.com/v0/b/lms-education-8bb9c.appspot.com/o/document%2Fphathienmadocwindow.pdf-1676131656839?alt=media&token=15032624-1fd1-446b-9282-dba08591b886"
            }
            width="100%"
            height="100%"
            id=""
            className=""
            display="block"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
