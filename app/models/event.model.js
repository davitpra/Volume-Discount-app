import prisma from "../config/db.js";

export const EventModel = {
  async create({ shop, name, data = {} }) {
    return await this.model.create({
      data: {
        shop,
        name,
        data,
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
  async update(id, data) {
    return await this.model.update({
      where: {
        id: +id,
      },
      data: data,
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
  async cartItemCount(shop, date) {
    return await prisma.$queryRaw`
            SELECT 
                "createdAt"::DATE as "key", COUNT(id) as "value", shop
            FROM "event"
            WHERE shop = ${shop} AND DATE("createdAt") > ${date}
            GROUP BY DATE("createdAt"), shop
        `;
  },
  async cartItemTopProducts(shop) {
    return await prisma.$queryRaw`
            SELECT 
                "productId",
                "productTitle",
                shop,
                COUNT(*) AS "productCount"
            FROM "event"
            WHERE shop = ${shop} 
            GROUP By "productId", "productTitle", shop
            ORDER BY "productCount" DESC
            LIMIT 10
            `;
  },
  model: prisma.event,
};

export const getEventChartCount = async ({ shop }) => {
  const now = new Date();
  const sevenDaysAgo = new Date(new Date().setDate(now.getDate() - 7));
  const tomorrow = new Date(new Date().setDate(now.getDate() + 1));

  const result = await EventModel.cartItemCount(shop, sevenDaysAgo);
  return [...result, { key: tomorrow.toISOString(), value: null }];
};
