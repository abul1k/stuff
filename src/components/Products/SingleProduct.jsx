import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ProductSkeleton from "../../Additionals/ProductSkeleton";

import { useGetProductQuery } from "../../features/api/apiSlice";
import { getRelatedProducts } from "../../features/products/productsSlice";

import { ROUTES } from "../../utils/routes";

import Product from "./Product";
import Products from "./Products";

const SingleProduct = () => {
  const [playSkeleton, setPlaySkeleton] = useState(true);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { list, related } = useSelector(({ products }) => products);

  const { data, isLoading, isFetching, isSuccess } = useGetProductQuery({ id });

  useEffect(() => {
    if (!isFetching && !isLoading && !isSuccess) {
      navigate(ROUTES.HOME);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isFetching, isSuccess]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(getRelatedProducts(data.category.id));
  }, [data, dispatch, list.length]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        setPlaySkeleton(false);
      }, 1000);
    };
  });

  setTimeout(() => {
    setPlaySkeleton(false);
  }, 1000);

  return !data && playSkeleton ? (
    <section className="preloader">
      <ProductSkeleton />
    </section>
  ) : (
    <>
      <Product {...data} />
      <Products products={related} amount={5} title="Related products" />
    </>
  );
};

export default SingleProduct;
