import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  //   Menu,
  //   MenuItem,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function TopBar() {
  //   const [anchorElProfile, setAnchorElProfile] = useState(null);
  //   const openProfile = Boolean(anchorElProfile);

  //   const handleMenuProfile = (event) => {
  //     setAnchorElProfile(event.currentTarget);
  //   };
  //   const handleCloseProfile = () => {
  //     setAnchorElProfile(null);
  //   };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton style={{ color: "white", marginRight: 10 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Menu
        </Typography>
        <div>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => console.log("Cart")}
          >
            <Badge badgeContent={2} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onMouseOver={handleMenuProfile}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElProfile}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            open={openProfile}
            onClose={handleCloseProfile}
            MenuListProps={{ onMouseLeave: handleCloseProfile }}
          >
            <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
            <MenuItem onClick={handleCloseProfile}>My account</MenuItem>
            <MenuItem onClick={handleCloseProfile}>Settings</MenuItem>
          </Menu> */}
        </div>
      </Toolbar>
    </AppBar>
  );
}
