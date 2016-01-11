export function extend(target, ...objs) {
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      target[key] = obj[key];
    });
  });
  return target;
}
