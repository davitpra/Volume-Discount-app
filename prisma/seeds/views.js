export const Data = [
  { key: "Jan", value: 160, name: "Desktop" },
  { key: "Feb", value: 70, name: "Desktop" },
  { key: "Mar", value: 200, name: "Desktop" },
  { key: "Apr", value: 380, name: "Desktop" },
  { key: "May", value: 150, name: "Desktop" },
  { key: "Jun", value: 750, name: "Desktop" },
  { key: "Jul", value: 400, name: "Desktop" },
  { key: "Aug", value: 600, name: "Desktop" },
  { key: "Sep", value: 180, name: "Desktop" },
  { key: "Oct", value: 200, name: "Desktop" },
  { key: "Nov", value: 350, name: "Desktop" },
  { key: "Dec", value: 230, name: "Desktop" },
  { key: "Jan", value: 300, name: "Mobile" },
  { key: "Feb", value: 100, name: "Mobile" },
  { key: "Mar", value: 87, name: "Mobile" },
  { key: "Apr", value: 200, name: "Mobile" },
  { key: "May", value: 190, name: "Mobile" },
  { key: "Jun", value: 300, name: "Mobile" },
  { key: "Jul", value: 280, name: "Mobile" },
  { key: "Aug", value: 240, name: "Mobile" },
  { key: "Sep", value: 180, name: "Mobile" },
  { key: "Oct", value: 400, name: "Mobile" },
  { key: "Nov", value: 420, name: "Mobile" },
  { key: "Dec", value: 300, name: "Mobile" },
];
export const views = async (prisma) => {
  for (const view of Data) {
    await prisma.event.create({
      data: {
        shop: "",
        name: "views",
        data: view,
      },
    });
  }
};
