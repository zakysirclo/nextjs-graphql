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
import TopBar from "../TopBar/index.js";

export default function ProductList({ categoryDetail }) {
  const router = useRouter();
  const { url_key, name, products } = categoryDetail;
  const { items } = products;

  return (
    <>
      <Head>
        <title>{name} - Product List</title>
      </Head>
      <TopBar />
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
                    {
                      pathname: `[category_key]/[product_key]`,
                      query: { name: item.name },
                    },
                    `${url_key}/${item.url_key}?name=${item.name}`
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
                      <Typography
                        variant="h6"
                        component="div"
                        align="center"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
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
