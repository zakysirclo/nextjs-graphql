import React from "react";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Box,
} from "@mui/material";
import Head from "next/head";
import numberFormatID from "../../../lib/number/numberFormatID.js";
import numberFormatUS from "../../../lib/number/numberFormatUS.js";

function ProductDetail({ product }) {
  const currency = product.price_range.maximum_price.final_price.currency;
  const maxPrice = product.price_range.maximum_price.final_price.value;

  return (
    <>
      <Head>
        <title>{product.name} - Product Detail</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ margin: "1rem 0" }}>
          {product.name}
        </Typography>

        <Card>
          <Box>
            <CardMedia
              component="img"
              width="500"
              height="500"
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
        </Card>
      </Container>
    </>
  );
}

export default ProductDetail;
