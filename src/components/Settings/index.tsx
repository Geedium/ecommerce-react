import { useState, useEffect } from "react";

import { useRouter } from "next/router";

import {
  Drawer,
  Box,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
} from "@mui/material";

import type { DrawerProps } from "@mui/material";

import {
  Palette,
  Translate as TranslateIcon,
  MoneyRounded as MoneyRoundedIcon,
} from "@mui/icons-material";

import { t } from "../../providers/LocaleProvider";

import Cookie from "js-cookie";

interface SettingsProps extends DrawerProps {}

function Settings({ open, onClose }: SettingsProps): JSX.Element {
  const [state, setState] = useState(0);

  const router = useRouter();

  useEffect(() => {
    if (locales && Array.isArray(locales)) {
      for (var i = 0; i < locales.length; i++) {
        if (locales[i] === locale) {
          setState(i);
        }
      }
    }
  }, []);

  const { locale, locales, defaultLocale } = router;

  const currencies = [
    "United Arab Emirates Dirham (AED)",
    "Argentine Peso (ARS)",
    "Australian Dollar (A$)",
    "Brazilian Real (R$)",
    "Canadian Dollar (CA$)",
    "Swiss Franc (CHF)",
    "Chilean Peso (CLP)",
    "Colombian Peso (COP)",
    "Costa Rican Colón (CRC)",
    "Czech Koruna (CZK)",
    "Danish Krone (DKK)",
    "Euro (€)",
    "Pound Sterling (£)",
    "Israeli New Shekel (₪)",
    "Mexican Peso (MX$)",
    "Norwegian Krone (NOK)",
    "New Zealand Dollar (NZ$)",
    "Peruvian Sol (PEN)",
    "Polski złoty (PLN)",
    "Romanian Leu (RON)",
    "Saudi Riyal (SAR)",
    "Swedish Krona (SEK)",
    "Turkish Lira (TRY)",
    "US Dollar ($)",
    "Uruguayan Peso (UYU)",
    "Hungarian Forint (HUF)",
    "Russian Ruble (RUB)",
  ];

  const resolveName = (lng: string) => {
    switch (lng) {
      case "en":
        return "English";
      case "lt":
        return "lietuvių kalba";
      case "de":
        return "Deutsch";
      default:
        return lng === defaultLocale ? null : resolveName(defaultLocale);
    }
  };

  const changeLanguage = (locale: string, index: number) => {
    setState(index);

    if (typeof window === "undefined") {
      Cookie.set("NEXT_LOCALE", locale, { expires: 7 });
    }

    router.push(router.pathname, router.pathname, {
      locale,
    });
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 300,
          px: 3,
          py: 1,
        }}
        role="presentation"
      >
        <Typography my={2} variant="h5">
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Palette sx={{ mr: 1 }} />
            {t("personalization")}
          </Stack>
        </Typography>
        <Typography my={2} variant="body2">
          {t("personalization_desc")}
        </Typography>
        <FormControl sx={{ my: 2, width: "100%" }}>
          <InputLabel
            sx={{ alignItems: "center", display: "flex" }}
            id="demo-multiple-name-label"
          >
            <TranslateIcon sx={{ mr: 2 }} />
            {t("locale")}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={state}
            onChange={() => {}}
            input={<OutlinedInput label="Name" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 150,
                },
              },
            }}
          >
            {locales &&
              locales.map((loc, index) => (
                <MenuItem
                  onClick={(_) => changeLanguage(loc, index)}
                  key={index}
                  value={index}
                >
                  {loc === locale ? (
                    <>{resolveName(loc)}</>
                  ) : (
                    <>{resolveName(loc)}</>
                  )}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <FormControl sx={{ my: 2, width: "100%" }}>
          <InputLabel
            sx={{ alignItems: "center", display: "flex" }}
            id="demo-multiple-name-label"
          >
            {" "}
            <MoneyRoundedIcon sx={{ mr: 2 }} />
            {t("currency")}
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            value={0}
            onChange={() => {}}
            input={<OutlinedInput label="Name" />}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 4.5 + 8,
                  width: 320,
                },
              },
            }}
          >
            {currencies &&
              currencies.map((currency, index) => (
                <MenuItem key={index} value={index}>
                  {currency}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </Box>
    </Drawer>
  );
}

export default Settings;
