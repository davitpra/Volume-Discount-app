import { useLoaderData } from "@remix-run/react";
import { normalize } from "../../utilities/dataNormalizer";
import { SimpleBarChart } from "./main/simpleBarChart";

export const SalesByChannels = () => {
  const { channelSales } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <SimpleBarChart
      title="Sales by channels"
      data={normalize(channelSales) || []}
    />
  );
};
