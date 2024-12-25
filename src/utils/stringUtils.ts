function toTitleCase(str: string): string {
  return (
    str
      // Add space between lowercase and uppercase transitions
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      // Capitalize the first letter of the string
      .replace(/^./, (match) => match.toUpperCase())
      // Capitalize letters after spaces
      .replace(/\s([a-z])/g, (match) => match.toUpperCase())
  );
}

export { toTitleCase };
