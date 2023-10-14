export const cleanUpName = (rawName) => {
  const cleanedName = rawName
    .replace(
      /(general store|store|general|kirana|genral|Genral|Ganrel|Provision|provison)/gi,
      ""
    )
    .slice(3)
    .trim();
  return cleanedName;
};
