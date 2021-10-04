import * as React from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Head from "next/head";

export default function ProductList({ category_detail }) {
  const router = useRouter();
  const { uid, name, products } = category_detail;
  const { items } = products;

  return (
    <>
      <Head>
        <title>{name} - Product List</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Container>
        <Typography variant="h4" align="center" sx={{ margin: "1rem 0" }}>
          {name} Product List
        </Typography>
        <Grid container spacing={2}>
          {items.map((item, index) => (
            <Grid
              item
              sx={{ cursor: "pointer" }}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={item.sku}
            >
              <Card
                onClick={() =>
                  router.push(
                    "[category_uid]/[product_name]",
                    `${uid}/${item.name}`
                  )
                }
              >
                <CardActionArea>
                  <Box sx={{ height: 250 }}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={item.image.url}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h6" component="div" align="center">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </Box>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
