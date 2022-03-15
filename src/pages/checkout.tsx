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
import { Stack, IconButton, Divider } from "@mui/material";

/**
 * @mui/icons-material
 * {@link https://www.npmjs.com/package/@mui/icons-material}
 *
 * Provides the Google Material icons
 * packaged as a set of React components.
 */
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";

import type { NextPage } from "next";

import * as React from "react";

import Section from "@/components/Section";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, addToCart, discardFromCart } from "../store/slices/cart";

import { wrapper } from "../store";

import API from "../actions";

import { formatPrice } from "../utils";
import Product from "../types/product";

const steps = [
  "Review Your Order",
  "Delivery Address",
  "Select Payment Method",
];

const CheckoutPage: NextPage = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const dispatch = useDispatch();

  const cart = useSelector(selectItems);

  const addItemToCart = (item) => {
    dispatch(addToCart(item));
  };

  const discardItem = (item: Product) => {
    dispatch(discardFromCart(item));
  };

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Section id={0} block={true} expand={true}>
      <Container sx={{ py: 12 }}>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }
              if (isStepSkipped(index)) {
                stepProps.completed = false;
              }
              return (
                <Step sx={{ color: "black" }} key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Reset</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                {activeStep + 1 === 1 ? (
                  <div>
                    {cart.map((item, index) => {
                      return (
                        <React.Fragment key={index}>
                          <div className="cart-wrap">
                            <div className="cart-wrap-items">
                              <img src={item.image} alt={item.name} />
                              <div className="cart-wrap-details">
                                <Typography variant="subtitle1">
                                  {item.name}
                                </Typography>
                                <Typography variant="subtitle2">
                                  <Stack>
                                    <Box>Price: {formatPrice(item.price)}</Box>
                                    <Box>
                                      Total:{" "}
                                      {formatPrice(item.price * item.amount)}
                                    </Box>
                                  </Stack>
                                </Typography>
                              </div>
                            </div>
                            <div className="buttons">
                              <IconButton
                                sx={{
                                  width: 32,
                                  height: 32,
                                }}
                                size="small"
                                onClick={(event) => {
                                  event.preventDefault();
                                  discardItem(item);
                                }}
                              >
                                <RemoveIcon />
                              </IconButton>
                              <p>{item.amount}</p>
                              <IconButton
                                sx={{
                                  width: 32,
                                  height: 32,
                                }}
                                size="small"
                                onClick={(event) => {
                                  event.preventDefault();
                                  addItemToCart(item);
                                }}
                              >
                                <AddIcon />
                              </IconButton>
                            </div>
                          </div>
                          {index !== cart.length - 1 && (
                            <Divider light={true} sx={{ mt: 1, mb: 2 }} />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  <div> Step {activeStep + 1}</div>
                )}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Box sx={{ flex: "1 1 auto" }} />
                {isStepOptional(activeStep) && (
                  <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                    Skip
                  </Button>
                )}

                <Button onClick={handleNext}>
                  {activeStep === steps.length - 1 ? "Finish" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Container>
    </Section>
  );
};

// This gets called on every request
export const getServerSideProps = wrapper.getServerSideProps(
  // @ts-ignore
  (store) => async (context) => {
    await store.dispatch(API.initials());
  }
);

export default CheckoutPage;
