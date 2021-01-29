import React, { PureComponent } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import { AlarmOn, CalendarToday, EventNoteTwoTone } from "@material-ui/icons";

function SideBar() {
  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          See more
        </ListSubheader>
      }
    >
      <ListItem button>
        <ListItemIcon>
          <TodayIcon></TodayIcon>
        </ListItemIcon>
        <ListItemText primary="Today" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <EventNoteTwoTone></EventNoteTwoTone>
        </ListItemIcon>
        <ListItemText primary="Upcomming" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <AlarmOn></AlarmOn>
        </ListItemIcon>
        <ListItemText primary="CountDown" />
      </ListItem>
    </List>
  );
}
export default SideBar;
