import { useLoaderData } from "@remix-run/react";
import { SparkLineWidget } from "./main/sparkLineWidget";
import { normalize } from "../../utilities/dataNormalizer";

export const FulfilledOrdersOverTime = () => {
  const { fulfilledOrders } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <SparkLineWidget
      title="Fulfilled orders over time"
      subTitle="5368"
      fluctuation="-8"
      data={normalize(fulfilledOrders) || []}
    />
  );
};
