import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo/index.js";
import ErrorMessage from "../../src/components/ErrorMessage/index.js";
import LoadingSpin from "../../src/components/LoadingSpin/index.js";
import ProductList from "../../src/components/ProductList/index.js";

export const GET_PRODUCT_LIST_BY_CATEGORY_UID = gql`
  query GetProductListByCategoryUid($categoryUid: String!) {
    categoryList(filters: { category_uid: { eq: $categoryUid } }) {
      uid
      name
      products {
        items {
          __typename
          sku
          name
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
  const { category_uid } = router.query;
  // console.log(category_uid);

  const { data, loading, error } = useQuery(GET_PRODUCT_LIST_BY_CATEGORY_UID, {
    variables: {
      categoryUid: category_uid,
    },
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingSpin />;

  const category_detail = data.categoryList[0];

  // console.log(category_detail);
  return <ProductList category_detail={category_detail} />;
}

export default withApollo({ ssr: true })(CategoryDetail);
