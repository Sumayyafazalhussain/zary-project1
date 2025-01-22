import { defineQuery } from "next-sanity";

export const allproducts = defineQuery(`
  *[_type == "product"]{
    _id,
    name,
    productdescription,
    price,
    discount,
    tags,
    sizes,
    "imageUrl": image.asset->url
  }
`);

export const fourPro = defineQuery(`
  *[_type == "product"][0..3]{
    _id,
    name,
    productdescription,
    price,
    discount,
    tags,
    sizes,
    "imageUrl": image.asset->url
  }
`);
