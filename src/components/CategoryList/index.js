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
import Link from "next/link";
import Head from "next/head";
import TopBar from "../TopBar/index.js";

export default function CategoryList({ categories }) {
  // console.log(categories);

  const defaultImage =
    "https://b2cdemo.getswift.asia/media/catalog/product/placeholder/default/bg.png";

  return (
    <>
      <Head>
        <title>Category List</title>
      </Head>
      <TopBar />
      <Container>
        <Typography variant="h4" align="center" sx={{ margin: "1rem 0" }}>
          Category List
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid
              item
              sx={{ cursor: "pointer" }}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={category.uid}
            >
              <Link href="/[category_key]" as={category.url_key}>
                <Card>
                  <CardActionArea>
                    <Box sx={{ height: 250 }}>
                      <CardMedia
                        component="img"
                        height={200}
                        image={
                          category.image_path !== null &&
                          category.image_path !== ""
                            ? category.image_path
                            : defaultImage
                        }
                        alt={category.name}
                      />
                      <CardContent>
                        <Typography variant="h6" component="div" align="center">
                          {category.name}
                        </Typography>
                      </CardContent>
                    </Box>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
