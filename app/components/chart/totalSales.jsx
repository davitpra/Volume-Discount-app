import { useLoaderData } from "@remix-run/react";
import { LineChart } from "./main/lineChart";
import { normalize } from "../../utilities/dataNormalizer";

export const TotalSales = () => {
  const { sales } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <LineChart
      title="Total sale"
      subTitle="$54,042.24"
      fluctuation="10.7"
      data={normalize(sales) || []}
    />
  );
};
