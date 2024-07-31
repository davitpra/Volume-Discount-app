import { useLoaderData } from "@remix-run/react";
import { SparkLineWidget } from "./main/sparkLineWidget";
import { normalize } from "../../utilities/dataNormalizer";

export const TotalOrders = () => {
  const { orders } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <SparkLineWidget
      title="Total Orders"
      subTitle="2081"
      fluctuation="12"
      data={normalize(orders) || []}
    />
  );
};
