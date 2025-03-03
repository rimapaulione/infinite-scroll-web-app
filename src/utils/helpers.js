export function sliceTitle(title, wordNum = 3) {
  const words = title.split(" ");
  return words.length > wordNum
    ? words.slice(0, wordNum).join(" ") + "..."
    : title;
}
