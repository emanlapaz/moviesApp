import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const styles = {
  title: {
    flexGrow: 1,
  },
};

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "WHATS HOT!", path: "/trending" },
    { label: "Movies", path: "/movies" },
    { label: "Movie Favorites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "TV SHOWS", path: "/tvShows" },
    { label: "On the Air", path: "/tvShows/onTheAir" },
    { label: "Casts", path: "/casts" },
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar>
          <Typography variant="h4" sx={styles.title}>
            MOVision!
          </Typography>
          <Typography variant="h6" sx={styles.title}>
            Your one stop shop for Movies, TV shows and so much more!
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
          <>
            {menuOptions.map((opt) => (
              <Button
                key={opt.label}
                color={opt.label === "WHATS HOT!" ? "secondary" : "inherit"}
                onClick={() => handleMenuSelect(opt.path)}
                sx={{
                  fontWeight: opt.label === "WHATS HOT!" ? "bold" : "normal",
                  color: "#ffffff", // Set the color to white (#ffffff) for all labels, including "WHATS HOT!"
                  backgroundColor:
                    opt.path === location.pathname
                      ? "#ff0000" // Set the active button background color here
                      : "transparent",
                }}
              >
                {opt.label}
              </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;
