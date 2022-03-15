import * as React from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Link,
  Grid,
  Checkbox,
  Button,
} from "@mui/material";

import { useRouter } from "next/router";

import LoadingButton from "@mui/lab/LoadingButton";

import {
  Person,
  Lock,
  Visibility,
  VisibilityOff,
  Email,
} from "@mui/icons-material";

import API from "../actions";
import { login } from "../store/slices/auth";

import { useDispatch } from "react-redux";

type Severity = "success" | "error" | "warning" | "info";

interface State {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  showPassword: boolean;
  privacy_policy: boolean;
  given_name: string;
  family_name: string;
  toast: boolean;
  toastMsg: string;
  toastAction: Severity;
  tab: number;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function RegistrationForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [values, setValues] = React.useState<State>({
    username: "",
    email: "",
    given_name: "",
    family_name: "",
    toastMsg: "",
    toastAction: "success",
    loading: false,
    toast: false,
    password: "",
    showPassword: false,
    privacy_policy: false,
    tab: 0,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.checked,
    });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setValues({ ...values, toast: false });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setValues({
      ...values,
      loading: true,
    });

    const sanitizeString = (str: string) => {
      if (str === " " || str.trim() === "") {
        return null;
      }
      return str;
    };

    // delay to pop animation (avoid quick flashes)
    setTimeout(async () => {
      dispatch(
        API.register(
          {
            username: values.username,
            email: sanitizeString(values.email),
            password: values.password,
            privacy_policy: values.privacy_policy,
          },
          async () => {
            setValues({
              ...values,
              loading: false,
            });

            // @ts-ignore
            let res = await dispatch(
              // @ts-ignore
              login({
                // @ts-ignore
                username: values.username,
                // @ts-ignore
                password: values.password,
              })
            );

            // @ts-ignore
            if (res.payload.errorMsg) {
              setValues({
                ...values,
                toast: true,
                loading: false,
                // @ts-ignore
                toastMsg: res.payload.errorMsg,
                toastAction: "error",
              });
            } else {
              router.push("/");
            }
          },
          (err: { message: string }) => {
            setValues({
              ...values,
              toast: true,
              loading: false,
              toastMsg: err.message,
              toastAction: "error",
            });
          }
        )
      );
    }, 1000);

    setValues({
      ...values,
      loading: false,
    });
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Snackbar
        open={values.toast}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={values.toastAction}
          sx={{ width: "100%" }}
        >
          {values.toastMsg}
        </Alert>
      </Snackbar>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        onChange={handleChange("username")}
        value={values.username}
        color="secondary"
        label="Vartotojo vardas"
        name="username"
        autoComplete="username"
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Person />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        id="email"
        onChange={handleChange("email")}
        value={values.email}
        color="secondary"
        label="E-paštas"
        name="email"
        autoComplete="email"
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Slaptažodis"
        id="password"
        color="secondary"
        autoComplete="new-password"
        type={values.showPassword ? "text" : "password"}
        onChange={handleChange("password")}
        value={values.password}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Grid container>
        <Grid item xs>
          <FormControlLabel
            control={<Checkbox value="remember" color="secondary" />}
            label="Prisiminti mane"
          />
        </Grid>
        <Grid item sx={{ display: "flex", alignItems: "center" }}>
          <FormControlLabel
            control={
              <Checkbox
                name="privacy_policy"
                id="privacy_policy"
                onChange={handleCheckChange}
                required={true}
                color="success"
              />
            }
            label="Susipažinau su privatumo politika"
          />
        </Grid>
      </Grid>
      <LoadingButton
        fullWidth
        loading={values.loading}
        variant="contained"
        type="submit"
        sx={{ mt: 3, mb: 2 }}
      >
        Registruotis
      </LoadingButton>
    </Box>
  );
}

export default RegistrationForm;
