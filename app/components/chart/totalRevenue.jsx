import { useLoaderData } from "@remix-run/react";
import { normalize } from "../../utilities/dataNormalizer";
import { SparkLineWidget } from "./main/sparkLineWidget";

export const TotalRevenue = () => {
  const { revenues } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <SparkLineWidget
      title="Total Revenue"
      subTitle="$25890"
      fluctuation="9.5"
      data={normalize(revenues) || []}
    />
  );
};
