import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { withApollo } from "../../lib/apollo/index.js";
import ErrorMessage from "../../src/components/ErrorMessage/index.js";
import LoadingSpin from "../../src/components/LoadingSpin/index.js";
import ProductDetail from "../../src/components/ProductDetail/index.js";

export const GET_PRODUCT_DETAIL = gql`
  query GetProductDetail($name: String!) {
    products(search: "", filter: { name: { match: $name } }) {
      items {
        __typename
        sku
        name
        description {
          html
        }
        image {
          url
        }
        price_range {
          maximum_price {
            final_price {
              currency
              value
            }
          }
          minimum_price {
            final_price {
              currency
              value
            }
          }
        }
      }
    }
  }
`;

function Product() {
  const router = useRouter();
  const { product_name } = router.query;
  // console.log(product_name);

  const { data, loading, error } = useQuery(GET_PRODUCT_DETAIL, {
    variables: {
      name: product_name,
    },
  });

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingSpin />;

  if (data.products.items.length === 0)
    return <ErrorMessage message={`Product Not Found!`} />;

  // console.log(data.products.items[0]);
  const product = data.products.items[0];

  return <ProductDetail product={product} />;
}

export default withApollo({ ssr: true })(Product);
