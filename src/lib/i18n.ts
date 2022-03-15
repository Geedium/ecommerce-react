import enUS from "../../locales/en-US.js";
import ltLT from "../../locales/lt-LT.js";
import de from "../../locales/de";

let locale = "";

const t = (msg) => {
  switch (locale) {
    case "en":
      return enUS[msg];
    case "lt":
      return ltLT[msg];
    case "de":
      return de[msg];
    default:
      return "";
  }
};
