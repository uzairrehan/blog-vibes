  // from ChatGPT
  export function formatDate(prop: { seconds: number; nanoseconds: number }) {
    const { seconds, nanoseconds } = prop;
    const milliseconds = seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const date = new Date(milliseconds);
    const pad = (num: number) => num.toString().padStart(2, "0");
    const day = pad(date.getDate());
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    let hours = date.getHours();
    const period = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const minutes = pad(date.getMinutes());
    const secondsTime = pad(date.getSeconds());
    const formattedDate = `${day} ${month} ${year} ${pad(
      hours
    )}:${minutes}:${secondsTime} ${period}`;

    return formattedDate;
  }
  //