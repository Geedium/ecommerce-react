import * as React from "react";

import { useRouter } from "next/router";

import en from "../../locales/en-US.js";
import lt from "../../locales/lt-LT.js";
import de from "../../locales/de";

const LocaleContext = React.createContext("");

function LocaleProvider({ children }): JSX.Element {
  const router = useRouter();

  const { locale } = router;

  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

function t(msg: string) {
  const locale = useLocale();

  switch (locale) {
    case "en":
      return en[msg] || `{{${msg}}}`;
    case "lt":
      return lt[msg] || `{{${msg}}}`;
    case "de":
      return de[msg] || `{{${msg}}}`;
    default:
      return msg;
  }
}

function useLocale() {
  const context = React.useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

export { LocaleProvider, useLocale, t };
