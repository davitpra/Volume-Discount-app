import { useLoaderData } from "@remix-run/react";
import { normalize } from "../../utilities/dataNormalizer";
import { SparkLineWidget } from "./main/sparkLineWidget";

export const TotalVolumeDiscountViews  = () => {
  const { revenues, volumeDiscountViews  } = useLoaderData();

  console.log('volumeDiscountViews', volumeDiscountViews);
  return (
    // simply replace the data provided below 😉
    <SparkLineWidget
      title="Total Volume Discount Views"
      subTitle = {volumeDiscountViews.length}
      fluctuation="9.5"
      data={normalize(revenues) || []}
    />
  );
};
