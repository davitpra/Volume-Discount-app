export const Data = [
  {
    key: "January",
    value: 80,
    name: "First-time",
  },
  {
    key: "February",
    value: 50,
    name: "First-time",
  },
  {
    key: "March",
    value: 57,
    name: "First-time",
  },
  {
    key: "April",
    value: 55,
    name: "First-time",
  },
  {
    key: "May",
    value: 53,
    name: "First-time",
  },
  {
    key: "June",
    value: 76,
    name: "First-time",
  },
  {
    key: "July",
    value: 92,
    name: "First-time",
  },

  {
    key: "January",
    value: 100,
    name: "Returning",
  },
  {
    key: "February",
    value: 73,
    name: "Returning",
  },
  {
    key: "March",
    value: 97,
    name: "Returning",
  },
  {
    key: "April",
    value: 73,
    name: "Returning",
  },
  {
    key: "May",
    value: 22,
    name: "Returning",
  },
  {
    key: "June",
    value: 72,
    name: "Returning",
  },
  {
    key: "July",
    value: 88,
    name: "Returning",
  },
];

export const returningCustomerRates = async (prisma) => {
  for (const rate of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "returningCustomerRates",
        data: rate,
      },
    });
  }
};
