import { useLoaderData } from "@remix-run/react";
import { normalize } from "../../utilities/dataNormalizer";
import { StackedAreaChart } from "./main/stackedAreaChart";

export const ReturningCustomerRate = () => {
  const { returningCustomerRates } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <StackedAreaChart
      title="Returning customer rate"
      subTitle="59.24%"
      fluctuation="6.0"
      data={normalize(returningCustomerRates) || []}
    />
  );
};
