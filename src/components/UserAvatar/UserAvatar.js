import React from "react";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";

// components

export default function UserAvatar({ color = "primary", ...props }) {
  var classes = useStyles();
  var theme = useTheme();

  return (
    <div
      className={classes.avatar}
      style={{ backgroundColor: theme.palette[color].main }}
    ></div>
  );
}
