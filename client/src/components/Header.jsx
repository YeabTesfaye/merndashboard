import { Box, Typography, useTheme } from "@mui/material";

const Header = ({ title, subtitle }) => {
  const { palette } = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={palette.secondary[200]}
        fontWeight={"bold"}
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={palette.secondary[500]}>
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
