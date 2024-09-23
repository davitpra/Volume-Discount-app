// @ts-check
import { DiscountApplicationStrategy } from "../generated/api";

/**
* @typedef {import("../generated/api").RunInput} RunInput
* @typedef {import("../generated/api").FunctionRunResult} FunctionRunResult
* @typedef {import("../generated/api").Target} Target
* @typedef {import("../generated/api").ProductVariant} ProductVariant
*/

/**
* @type {FunctionRunResult}
*/

// Empty discount object if no discounts are applicable
const EMPTY_DISCOUNT = {
  discountApplicationStrategy: DiscountApplicationStrategy.First,
  discounts: [],
};

/**
* @param {RunInput} input
* @returns {FunctionRunResult}
*/
export function run(input) {

  // get the cofiguration from the metafield value of the discount
  const configuration = JSON.parse(
    input?.discountNode?.metafield?.value ?? "{}"
  );

  // If configuration is not set or discountValues is not an array, return empty discount
  if (!configuration.discountValues || !Array.isArray(configuration.discountValues)) {
    return EMPTY_DISCOUNT;
  }

  // targets will be only products that are in configuration variants
  const targets = input.cart.lines
    .filter(line => {
      const variant = line.merchandise;
      return configuration.variants.some(v => v === variant.id);
    })
    .map(line => {
      const variant = /** @type {ProductVariant} */ (line.merchandise);
      return /** @type {Target} */ ({
        productVariant: {
          id: variant.id
        }
      });
    });

  // If no targets are found, return empty discount
  if (!targets.length) {
    console.error("No cart lines qualify for volume discount.");
    return EMPTY_DISCOUNT;
  }

  const discounts = [];
  
  // Sort discount values by quantity in descending order
  const sortedDiscountValues = configuration.discountValues.sort((a, b) => b.quantity - a.quantity); 

  // Loop through each target and check if it qualifies for any discount
  for (const target of targets) {
    // Find the line item in the cart that corresponds to the target
    const line = input.cart.lines.find(line => line.merchandise?.id === target?.productVariant?.id);
    if (!line) continue;

    // Find the highest discount that the line item qualifies for
    const eligibleDiscount = sortedDiscountValues.find(discountValue => line.quantity >= discountValue.quantity);

    // If no discount is found, continue to the next line item
    for (const discountValue of sortedDiscountValues) {
      // Check if the line item quantity is enough for this discount
      if (line.quantity >= discountValue.quantity && eligibleDiscount.quantity > 0) {
        // If line quantity is enough for this discount, create a discount for this line item
        const discount = {
          targets: [target],
          message: eligibleDiscount.discount_message,
          value: eligibleDiscount?.discount_type === 'percentage' ? {
            percentage: {
              value: parseFloat(eligibleDiscount?.discount)
            }
          } : {
            fixedAmount: {
              amount: parseFloat(eligibleDiscount?.discount)
            }
          }
        };
        discounts.push(discount);
        // Do not break the loop, continue checking the other line items
      }
    }
  }

  // console.log("Discounts: ", JSON.stringify(discounts, null, 2));

  // Return the discounts
  return {
    discounts,
    discountApplicationStrategy: DiscountApplicationStrategy.All
  };

};