import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDownwardOutlined,
} from "@mui/icons-material";
import FlexBetween from "@/components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "@/state/index";
import profileImage from "@/assets/profile.jpeg";
import {
  AppBar,
  Button,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Box,
  Typography,
  Menu,
  MenuItem
} from "@mui/material";
import { useState } from "react";
const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  return (
    <AppBar
      sx={{
        position: "static",
        boxShadow: "none",
        background: "none",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
        }}
      >
        {/** SIDE BAR**/}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={palette.background.alt}
            borderRadius={"9px"}
            gap={"3rem"}
            p={"0.1rem 1.5rem"}
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/*** RIGHT SIDE ***/}
        <FlexBetween gap={"1.5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px", color: "dark" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box
                component={"img"}
                alt={"Profile"}
                src={profileImage}
                height={"40px"}
                width={"40px"}
                borderRadius={"50%"}
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign={"left"}>
                <Typography
                  fontWeight={"bold"}
                  fontSize={"0.85rem"}
                  sx={{ color: palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize={"0.75rem"}
                  sx={{ color: palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <ArrowDownwardOutlined
                sx={{ color: palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{vertical : "bottom", horizontal : "center"}}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
