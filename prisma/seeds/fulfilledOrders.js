export const Data = [
  {
    key: 0,
    value: 60,
  },
  {
    key: 1,
    value: 140,
  },
  {
    key: 2,
    value: 30,
  },
  {
    key: 3,
    value: 120,
  },
  {
    key: 4,
    value: 100,
  },
  {
    key: 5,
    value: 90,
  },
  {
    key: 6,
    value: 80,
  },
  {
    key: 7,
    value: 25,
  },
  {
    key: 8,
    value: 14,
  },
  {
    key: 9,
    value: 10,
  },
  {
    key: 10,
    value: 3,
  },
];

export const fulfilledOrders = async (prisma) => {
  for (const fulfilledOrder of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "fulfilledOrders",
        data: fulfilledOrder,
      },
    });
  }
};
