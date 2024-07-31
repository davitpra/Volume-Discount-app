import { json } from "@remix-run/node";
import { authenticateProxy } from "../config/shopify";
import { EventModel } from "../models/event.model.js";

export const action = async ({ request }) => {
  try {
    const {
      admin,
      session: { shop },
    } = await authenticateProxy(request);
    const { event, details, timestamp } = await request.json(); // event's name and details
    await EventModel.create({ shop, name: event, data: details });
    // const events = await EventModel.list(shop);

    return json({ message: "The event has been successfully tracked!" });
  } catch (e) {
    console.error(e);
    return json({ error: e });
  }
};
