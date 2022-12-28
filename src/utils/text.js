export const toTitleCase = (text) => {
  if (typeof text !== "string") return text;
  text = text.replace(/ /g, " ");
  text = text.replace(/`/g, "'");
  var words = text.toLowerCase().split(" ");

  for (var i = 0; i < words.length; i++) {
    if (words[i][0]) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
  }
  return words.join(" ");
};

export const getInitial = (text) => {
  var words = text.toUpperCase().split(" ");

  for (var i = 0; i < words.length; i++) {
    if (words[i][0]) {
      words[i] = words[i][0];
    }
  }
  return words.join("").replace(/[^A-Z]+/g, "");
};
