export const Data = [
  {
    key: 0,
    value: 50,
  },
  {
    key: 1,
    value: 20,
  },
  {
    key: 2,
    value: 30,
  },
  {
    key: 3,
    value: 40,
  },
  {
    key: 4,
    value: 80,
  },
  {
    key: 5,
    value: 90,
  },
  {
    key: 6,
    value: 20,
  },
  {
    key: 7,
    value: 25,
  },
  {
    key: 8,
    value: 100,
  },
  {
    key: 9,
    value: 110,
  },
  {
    key: 10,
    value: 200,
  },
];
export const orders = async (prisma) => {
  for (const order of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "orders",
        data: order,
      },
    });
  }
};
