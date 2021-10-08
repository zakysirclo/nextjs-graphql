import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Box,
  Button,
  TextField,
  Fab,
} from "@mui/material";
import Head from "next/head";
import numberFormatID from "../../../lib/number/numberFormatID.js";
import numberFormatUS from "../../../lib/number/numberFormatUS.js";
import useStyles from "./styles.js";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useReactiveVar } from "@apollo/client";
import { cartVar } from "../../states/cart/state.js";
import { addToCart } from "../../states/cart/actions.js";
import TopBar from "../TopBar/index.js";

function ProductDetail({ product }) {
  const styles = useStyles();
  const cart = useReactiveVar(cartVar);
  const [qty, setQty] = useState(1);

  const currency = product.price_range.maximum_price.final_price.currency;
  const maxPrice = product.price_range.maximum_price.final_price.value;

  console.log(cart);

  const handleAddToCart = () => {
    const { sku, name } = product;
    const item = {
      sku,
      name,
      price: maxPrice,
      qty: parseInt(qty),
      total: maxPrice * parseInt(qty),
    };
    addToCart(item);
  };

  return (
    <>
      <Head>
        <title>{product.name} - Product Detail</title>
      </Head>
      <TopBar />
      <Container maxWidth="md" sx={{ padding: "2rem 0" }}>
        <Card sx={{ boxShadow: 3 }}>
          <Box>
            <CardHeader
              title={
                <Typography
                  variant="h4"
                  align="center"
                  sx={{ margin: "1rem 0" }}
                  dangerouslySetInnerHTML={{ __html: product.name }}
                />
              }
            />
            <CardMedia
              component="img"
              className={styles.image}
              image={product.image.url}
              alt={product.name}
            />
            <CardContent>
              <Typography variant="h6" align="center">
                {currency}
                &nbsp;
                {currency === "IDR"
                  ? numberFormatID(maxPrice)
                  : numberFormatUS(maxPrice)}
              </Typography>
              <Typography
                variant="body2"
                component="div"
                align="left"
                dangerouslySetInnerHTML={{ __html: product.description.html }}
              />
            </CardContent>
          </Box>
          <CardActions className={styles.center}>
            <Fab
              color="secondary"
              aria-label="minus"
              onClick={() => setQty(qty - 1)}
              disabled={qty === 1 ? true : false}
            >
              <RemoveIcon />
            </Fab>

            <TextField
              id="qty"
              variant="outlined"
              type="number"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
              className={styles.inputQty}
            />

            <Fab
              color="secondary"
              aria-label="add"
              onClick={() => setQty(qty + 1)}
              sx={{ marginRight: "8px" }}
            >
              <AddIcon />
            </Fab>
          </CardActions>
          <CardActions className={styles.center}>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => handleAddToCart()}
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
}

export default ProductDetail;
