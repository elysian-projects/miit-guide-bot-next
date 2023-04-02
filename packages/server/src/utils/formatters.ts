const SERVICE_CHAR = "|||";

export const normalizeContent = (data: string): string[] => {
  // Early exit on empty string
  if(data.length === 0) {
    return [];
  }

  // Division into array of strings of at most 800 symbols length
  const dividedData = (data.replaceAll("\n", SERVICE_CHAR)).match(/.{1,800}/g) ?? [];

  // Reassembling words with the previous step if a whole word was divided into different pages
  for(let i = 1; i < dividedData.length; i++) {
    // The case when the division has gone exactly before or after a whitespace, doing nothing in this case
    if(dividedData[i].startsWith(" ") || dividedData[i - 1].endsWith(" ")) {
      continue;
    }

    const disassembledMessage = dividedData[i].split(" ");

    // Removing characters until first whitespace from the current page and concatenate it to the end of the previous page
    dividedData[i - 1] += disassembledMessage[0];
    dividedData[i] = disassembledMessage.map((item, index) => (index !== 0) ? item : "").join(" ");
  }

  const result: string[] = [];

  // Removing trailing spaces and empty pages
  for(let i = 0; i < dividedData.length; i++) {
    const item = dividedData[i].trim().replaceAll(SERVICE_CHAR, "\n");

    if(item.length !== 0) {
      result.push(item);
    }
  }

  return result;
};
