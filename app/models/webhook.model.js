import prisma from "../config/db.js";

export const WebhookModel = {
  async create({ shop, topic, payload = {} }) {
    return await this.model.create({
      data: {
        shop,
        topic,
        payload,
      },
    });
  },
  async find(id) {
    return await this.model.findUnique({
      where: {
        id: +id,
      },
    });
  },
  async update(id, payload) {
    return await this.model.update({
      where: {
        id: +id,
      },
      data: payload,
    });
  },
  async list(shop, conditions = {}) {
    return await this.model.findMany({
      where: {
        shop: shop,
        ...conditions,
      },
    });
  },
  async delete(id) {
    return await this.model.delete({
      where: {
        id: +id,
      },
    });
  },
  async deleteMany(shop) {
    return await this.model.deleteMany({
      where: {
        shop: shop,
      },
    });
  },
  model: prisma.webhook,
};
