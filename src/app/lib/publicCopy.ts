export function withoutEmDash(value: string) {
  return value.replace(/\u2014/g, ",");
}
