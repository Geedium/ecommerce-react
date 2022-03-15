import { Button, Divider, Typography, Stack, Link, Box } from "@mui/material";

import { Facebook, Google } from "@mui/icons-material";

function SocialLogin() {
  return (
    <Box>
      <Divider />
      <Typography sx={{ my: 2 }} variant="body2">
        Prisijunkite naudodami socialinę žiniasklaidą, kad gautumėte greitą
        prieigą:
      </Typography>
      <Stack spacing={1}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<Google />}
          sx={{ justifyContent: "flex-start" }}
        >
          Prisijungti su Google
        </Button>
        <Button
          color="primary"
          variant="contained"
          startIcon={<Facebook />}
          sx={{ justifyContent: "flex-start" }}
        >
          Prisijungti su Facebook
        </Button>
      </Stack>
      <Typography sx={{ my: 2 }} variant="body2">
        Ši svetainė yra apsaugota reCAPTCHA ir taikoma „Google“{" "}
        <Link
          underline="none"
          variant="body2"
          color="text.secondary"
          href="https://policies.google.com/privacy"
        >
          Privatumo Politika
        </Link>{" "}
        ir{" "}
        <Link
          underline="none"
          variant="body2"
          color="text.secondary"
          href="https://policies.google.com/terms"
        >
          Paslaugų Teikimo Sąlygos
        </Link>
        {"."}
      </Typography>
    </Box>
  );
}

export default SocialLogin;
