import * as React from "react";
import { withApollo } from "../lib/apollo/index.js";
import CategoryList from "../src/components/CategoryList";
import { gql, useQuery } from "@apollo/client";
import LoadingSpin from "../src/components/LoadingSpin";
import ErrorMessage from "../src/components/ErrorMessage";

export const GET_CATEGORY_LIST = gql`
  query GetCategoryList {
    categoryList {
      uid
      name
      image_path
      children {
        uid
        name
        image_path
        children {
          uid
          name
          image_path
          children {
            uid
            name
            image_path
          }
        }
      }
    }
  }
`;

function Index() {
  const { loading, error, data } = useQuery(GET_CATEGORY_LIST);

  if (error) return <ErrorMessage message={error.message} />;
  if (loading) return <LoadingSpin />;

  console.log(data.categoryList[0].children);
  const categories = data.categoryList[0].children;

  return <CategoryList categories={categories} />;
}

export default withApollo({ ssr: false })(Index);
