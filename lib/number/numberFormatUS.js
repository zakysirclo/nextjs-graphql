export default function numberFormatUS(value) {
  return new Intl.NumberFormat("en-US").format(value);
}
