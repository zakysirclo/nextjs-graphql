import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

export default function TopBar() {
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
        </div>
      </Toolbar>
    </AppBar>
  );
}
