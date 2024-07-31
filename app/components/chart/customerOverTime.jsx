import { useLoaderData } from "@remix-run/react";
import { SparkLineWidget } from "./main/sparkLineWidget";
import { normalize } from "../../utilities/dataNormalizer";

export const CustomerOverTime = () => {
  const { customers } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <SparkLineWidget
      title="Customer over time"
      subTitle="623"
      fluctuation="-3"
      data={normalize(customers) || []}
    />
  );
};
