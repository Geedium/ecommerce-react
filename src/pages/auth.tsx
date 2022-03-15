import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

// MUI v5
import {
  Grid,
  Box,
  Paper,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Link,
  Stack,
  InputAdornment,
  IconButton,
  Tab,
  Tabs,
} from "@mui/material";

import { wrapper } from "../store";
import { login } from "../store/slices/auth";

import LoadingButton from "@mui/lab/LoadingButton";

import { useRouter } from "next/router";

import RegistrationForm from "../components/RegistrationForm";
import SocialLogin from "../components/SocialLogin";

import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

// App
import { useDispatch, useSelector } from "react-redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Severity = "success" | "error" | "warning" | "info";

interface State {
  username: string;
  password: string;
  showPassword: boolean;
  privacy_policy: boolean;
  toast: boolean;
  loading: boolean;
  toastMsg: string;
  toastAction: Severity;
  tab: number;
}

function Auth() {
  const router = useRouter();

  const dispatch = useDispatch();

  const [values, setValues] = React.useState<State>({
    username: "",
    password: "",
    showPassword: false,
    toastMsg: "",
    privacy_policy: false,
    toastAction: "success",
    toast: false,
    loading: false,
    tab: 0,
  });

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValues({
      ...values,
      tab: newValue,
    });
  };

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setValues({
      ...values,
      loading: true,
    });

    // @ts-ignore
    let res = await dispatch(
      // @ts-ignore
      login({
        // @ts-ignore
        username: String(data.get("username")),
        // @ts-ignore
        password: String(data.get("password")),
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

    setValues({
      ...values,
      loading: false,
    });
  };

  return (
    <Grid container sx={{ flex: "1 1", mt: "112px" }}>
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
      <Grid
        item
        xs={false}
        sm={4}
        md={9}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={3} component={Paper} elevation={0} square>
        <Paper color="secondary">
          <Tabs
            textColor="secondary"
            value={values.tab}
            onChange={handleChangeTab}
            centered
          >
            <Tab label="Prisijungimas" {...a11yProps(0)} />
            <Tab label="Registracija" {...a11yProps(1)} />
          </Tabs>
        </Paper>
        <Box
          sx={{
            mx: 4,
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TabPanel value={values.tab} index={0}>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                onChange={handleChange("username")}
                value={values.username}
                color="secondary"
                label="E-paštas arba vartotojo vardas"
                name="username"
                autoComplete="username"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
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
                autoComplete="current-password"
                type={values.showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                value={values.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
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
                        {values.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Grid container>
                <Grid item xs>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="privacy_policy"
                        onChange={handleChange("privacy_policy")}
                        required={true}
                        color={values.privacy_policy ? "success" : "error"}
                      />
                    }
                    label="Prisiminti mane"
                  />
                </Grid>
                <Grid item sx={{ display: "flex", alignItems: "center" }}>
                  <Link
                    underline="none"
                    href="#"
                    variant="body1"
                    color="text.secondary"
                  >
                    Pamiršote slaptažodį?
                  </Link>
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                loading={values.loading}
                variant="contained"
                type="submit"
                sx={{ mt: 3, mb: 2 }}
              >
                Prisijungti
              </LoadingButton>
            </Box>
          </TabPanel>
          <TabPanel value={values.tab} index={1}>
            <RegistrationForm />
          </TabPanel>
          <SocialLogin />
        </Box>
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
  // @ts-ignore
  ({ ctx }) => {
    const { loggedIn } = store.getState().auth;
    if (loggedIn) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      props: {},
    };
  }
);

export default Auth;
