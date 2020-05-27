export function isValidJsonText(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function test() {
  console.log('test');
}
