import React from "react";
import { AppBar, Toolbar, IconButton, Typography, Badge } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useReactiveVar } from "@apollo/client";
import { cartVar } from "../../states/cart/state.js";
import { useRouter } from "next/router";

export default function TopBar() {
  const router = useRouter();
  const cart = useReactiveVar(cartVar);
  console.log(cart, cart.items.length);
  const countCartItems = cart.items.length;

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          style={{ color: "white", marginRight: 10 }}
          onClick={() => router.back()}
        >
          <ArrowBackIcon />
        </IconButton>
        <IconButton
          style={{ color: "white", marginRight: 10 }}
          onClick={() => router.push("/")}
        >
          <HomeIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mini E-Commerce
        </Typography>
        <div>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => router.push("/cart")}
          >
            <Badge badgeContent={countCartItems} color="error">
              <AddShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
}
