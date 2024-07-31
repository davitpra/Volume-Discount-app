export const Data = [
  {
    key: 0,
    value: 60,
  },
  {
    key: 1,
    value: 40,
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
    value: 14,
  },
  {
    key: 9,
    value: 20,
  },
  {
    key: 10,
    value: 10,
  },
];
export const customers = async (prisma) => {
  for (const customer of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "customers",
        data: customer,
      },
    });
  }
};
