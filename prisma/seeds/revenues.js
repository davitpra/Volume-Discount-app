export const Data = [
  {
    key: 0,
    value: 800,
  },
  {
    key: 1,
    value: 500,
  },
  {
    key: 2,
    value: 300,
  },
  {
    key: 3,
    value: 400,
  },
  {
    key: 4,
    value: 400,
  },
  {
    key: 5,
    value: 1000,
  },
  {
    key: 6,
    value: 200,
  },
  {
    key: 7,
    value: 800,
  },
  {
    key: 8,
    value: 900,
  },
  {
    key: 9,
    value: 200,
  },
  {
    key: 10,
    value: 400,
  },
];
export const revenues = async (prisma) => {
  for (const revenue of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "revenues",
        data: revenue,
      },
    });
  }
};
