import * as React from "react";

import { Container, Typography, Button, Stack } from "@mui/material";

import Section from "@/components/Section";

import { useRouter } from "next/router";

function Custom404() {
  const router = useRouter();

  return (
    <Section id={0} block={true} expand={true}>
      <Container sx={{ py: 12 }}>
        <Stack spacing={2} justifyContent="center">
          <Typography variant="h5" align="center">
            Puslapis nerastas
          </Typography>
          <Button
            color="primary"
            variant="contained"
            onClick={() => router.back()}
          >
            Grįžti atgal
          </Button>
        </Stack>
      </Container>
    </Section>
  );
}

export default React.memo(Custom404);
