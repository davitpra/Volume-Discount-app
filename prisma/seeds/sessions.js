export const Data = [
  {
    key: "april - march",
    value: 80000,
    name: "Mobile",
  },
  {
    key: "april - march",
    value: 25000,
    name: "Desktop",
  },
  {
    key: "april - march",
    value: 10000,
    name: "Tablet",
  },
  {
    key: "april - march",
    value: 2000,
    name: "Others",
  },
];
export const sessions = async (prisma) => {
  for (const session of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "sessions",
        data: session,
      },
    });
  }
};
