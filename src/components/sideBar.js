import React, { PureComponent } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import { makeStyles } from "@material-ui/core/styles";
import { AlarmOn, CalendarToday, EventNoteTwoTone } from "@material-ui/icons";

function SideBar(props) {
  let itemColor = "black";
  let listBgColor = "#f9f9f9";
  if (props.darkMode) {
    itemColor = "#f9f9f9";
    listBgColor = "#2a2a2a";
  } else {
    itemColor = "black";
    listBgColor = "#f9f9f9";
  }
  const useStyles = makeStyles({
    listItem: {
      color: itemColor,
    },
    mainList: {
      background: listBgColor,
      height: "100vh",
    },
  });
  const classes = useStyles();
  return (
    <List
      className={classes.mainList}
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader className={classes.listItem} component="div" id="nested-list-subheader">
          See more
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <TodayIcon className={classes.listItem}></TodayIcon>
        </ListItemIcon>
        <ListItemText className={classes.listItem} color="white" primary="Today" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EventNoteTwoTone className={classes.listItem}></EventNoteTwoTone>
        </ListItemIcon>
        <ListItemText className={classes.listItem} primary="Upcomming" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AlarmOn className={classes.listItem}></AlarmOn>
        </ListItemIcon>
        <ListItemText className={classes.listItem} primary="CountDown" />
      </ListItem>
    </List>
  );
}
export default SideBar;
