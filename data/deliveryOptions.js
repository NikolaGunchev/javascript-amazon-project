import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption;
}

//taking in mind that the weekends arent working days the day is calculated excluding them
export function calculateDeliveryDate(deliveryOption) {
  const today = dayjs();
  let deliveryDate = today;
  let days = deliveryOption.deliveryDays;

  while (days) {
    while (isWeekend(deliveryDate)) {
      deliveryDate = deliveryDate.add(1, "days");
    }
    deliveryDate = deliveryDate.add(1, "days");
    days--;
  }
  const dateString = deliveryDate.format("dddd, MMMM D");

  return dateString;
}

function isWeekend(date) {
  let is = false;
  const dateString = date.format("dddd");
  switch (dateString) {
    case "Saturday":
      is = true;
      break;
    case "Sunday":
      is = true;
    default:
      break;
  }

  return is;
}
