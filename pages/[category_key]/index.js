import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo/index.js";
import ErrorMessage from "../../src/components/ErrorMessage/index.js";
import LoadingSpin from "../../src/components/LoadingSpin/index.js";
import ProductList from "../../src/components/ProductList/index.js";

export const GET_PRODUCT_LIST_BY_CATEGORY_KEY = gql`
  query GetProductListByCategoryUid($url_key: String!) {
    categoryList(filters: { url_key: { eq: $url_key } }) {
      uid
      name
      url_key
      products {
        items {
          __typename
          sku
          name
          url_key
          image {
            url
          }
        }
      }
    }
  }
`;

function CategoryDetail() {
  const router = useRouter();
  const { category_key } = router.query;
  const [categoryDetail, setCategoryDetail] = useState({
    url_key: "",
    name: "",
    products: {
      items: [],
    },
  });
  const { data, loading, error } = useQuery(GET_PRODUCT_LIST_BY_CATEGORY_KEY, {
    variables: {
      url_key: category_key,
    },
  });

  useEffect(() => {
    if (data?.categoryList) {
      setCategoryDetail(data.categoryList[0]);
    }
  }, [data]);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingSpin />;

  return <ProductList categoryDetail={categoryDetail} />;
}

export default withApollo({ ssr: true })(CategoryDetail);
