export const Data = [
  {
    value: 600,
    key: "July 1, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 530,
    key: "July 2, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 690,
    key: "July 3, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 590,
    key: "July 4, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 710,
    key: "July 5, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 630,
    key: "July 6, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 900,
    key: "July 7, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 650,
    key: "July 8, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 940,
    key: "July 9, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 770,
    key: "July 10, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 1090,
    key: "July 11, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 970,
    key: "July 12, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 1100,
    key: "July 13, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 990,
    key: "July 14, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 1043,
    key: "July 15, 2024",
    name: "July 1 - July 15, 2024",
  },
  {
    value: 450,
    key: "June 1, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 340,
    key: "June 2, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 480,
    key: "June 3, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 390,
    key: "June 4, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 509,
    key: "June 5, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 450,
    key: "June 6, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 603,
    key: "June 7, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 510,
    key: "June 8, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 690,
    key: "June 9, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 520,
    key: "June 10, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 403,
    key: "June 11, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 560,
    key: "June 12, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 450,
    key: "June 13, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 690,
    key: "June 14, 2024",
    name: "Previous month",
    isComparison: true,
  },
  {
    value: 620,
    key: "June 15, 2024",
    name: "Previous month",
    isComparison: true,
  },
];
export const sales = async (prisma) => {
  for (const sale of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "sales",
        data: sale,
      },
    });
  }
};
