export const Data = [
  {
    key: "Online store",
    value: 45600,
    name: "Today",
  },
  {
    key: "Kimo Subs",
    value: 23900,
    name: "Today",
  },
  {
    key: "Facebook & Instagram",
    value: 7800,
    name: "Today",
  },
  {
    key: "Tiktok",
    value: 3500,
    name: "Today",
  },
  {
    key: "Online store",
    value: 50000,
    name: "Yesterday",
  },
  {
    key: "Kimo Subs",
    value: 24000,
    name: "Yesterday",
  },
  {
    key: "Facebook & Instagram",
    value: 9800,
    name: "Yesterday",
  },
  {
    key: "Tiktok",
    value: 43000,
    name: "Yesterday",
  },
];

export const channelSales = async (prisma) => {
  for (const sale of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "channelSales",
        data: sale,
      },
    });
  }
};
