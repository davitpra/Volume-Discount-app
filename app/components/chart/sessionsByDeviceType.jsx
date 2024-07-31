import { useLoaderData } from "@remix-run/react";
import { normalize } from "../../utilities/dataNormalizer";
import { DonutChart } from "./main/donutChart";

export const SessionsByDeviceType = () => {
  const { sessions } = useLoaderData();
  return (
    // simply replace the data provided below 😉
    <DonutChart
      title="Session by device type"
      trendMetric="7.0"
      data={normalize(sessions) || []}
    />
  );
};
