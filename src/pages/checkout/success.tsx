import { useRouter } from "next/router";

/**
 * React
 * {@link https://reactjs.org}
 *
 * React is a JavaScript library for
 * creating user interfaces.
 */
import { useEffect } from "react";

import { useDispatch } from "react-redux";

/**
 * MUI
 * {@link https://mui.com}
 *
 * MUI provides a robust, customizable,
 * and accessible library of foundational
 * and advanced components, enabling you
 * to build your design system and develop
 * React applications faster.
 */
import { Button, Typography, Container } from "@mui/material";

import Section from "@/components/Section";

import { clearCart } from "../../store/slices/cart";

function SuccessPage() {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart);
  }, []);

  return (
    <Section id={0} block={true} expand={true}>
      <Container sx={{ py: 12 }}>
        <Typography align="center" variant="h5">
          Thank you for your order
        </Typography>
        <Typography align="center" paragraph={true}>
          We are currently processing your order and will send you a
          confirmation email.
        </Typography>
        <div className="is-centered">
          <Button onClick={() => router.push("/")}>Continue Shopping</Button>
        </div>
      </Container>
    </Section>
  );
}

export default SuccessPage;
