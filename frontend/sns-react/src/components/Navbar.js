import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Badge from "@material-ui/core/Badge";
import { FiLogOut } from "react-icons/fi";
import { withCookies } from "react-cookie";

const useStyles = makeStyles((theme) => ({
  bg: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const Logout = () => (event) => {
    props.cookies.remove("current-token");
    window.location.href = "/";
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            SNS App
          </Typography>
          <Badge className={classes.bg} badgeContent={3} color="secondary">
            <NotificationsIcon />
          </Badge>
          <button className="signOut" onClick={Logout()}>
            <FiLogOut />
          </button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withCookies(Navbar);
