// sanity/lib/queries.ts
export const allproducts = `
  *[_type == "product"] {
    _id,
    name,
    "imageUrl": image.asset->url,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }
`;

export const productDetailQuery = `
  *[_type == "product" && _id == $id][0] {
    _id,
    name,
    "imageUrl": image.asset->url,
    price,
    description,
    discountPercentage,
    isFeaturedProduct,
    stockLevel,
    category
  }
`;
