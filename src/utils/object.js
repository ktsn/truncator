export function extend(target, ...objs) {
  objs.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      if (obj[key] !== undefined) target[key] = obj[key];
    });
  });
  return target;
}
