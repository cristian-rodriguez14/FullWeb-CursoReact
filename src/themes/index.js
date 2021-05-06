import defaultTheme from "./default";

import { createMuiTheme } from "@material-ui/core";

const overrides = {
  typography: {
    h1: {
      fontSize: "4rem",
    },
    h2: {
      fontSize: "3rem",
    },
    h3: {
      fontSize: "2.64rem",
    },
    h4: {
      fontSize: "2.5rem",
    },
    h5: {
      fontSize: "2.285rem",
    },
    h6: {
      fontSize: "2.142rem",
    },
  },
};

const themes = {
  default: createMuiTheme({ ...defaultTheme, ...overrides }),
};

export default themes;
