function checkENV(config) {
  for (const [key, value] of Object.entries(config)) {
    if (!value) {
      throw new Error(`Missing environment variable: ${key}`);
    }
  }
}

function formatZodErrors(error) {
  const formatted = {};

  for (const issue of error.issues) {
    const field = issue.path.join(".");

    if (field && !formatted[field]) {
      formatted[field] = issue.message;
    }
  }

  return formatted;
}


export { checkENV, formatZodErrors };
