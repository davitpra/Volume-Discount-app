import { useLoaderData } from "@remix-run/react";
import { BarChart } from "./main/barChart";
import { normalize } from "../../utilities/dataNormalizer";

export const UserViews = () => {
  const { views } = useLoaderData();

  return (
    // simply replace the data provided below 😉
    <BarChart
      title="User views"
      subTitle="Jan - Dec 2023"
      data={normalize(views) || []}
    />
  );
};
