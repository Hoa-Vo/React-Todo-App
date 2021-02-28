import React, { useState } from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import TodayIcon from "@material-ui/icons/Today";
import CodeIcon from "@material-ui/icons/Code";
import { makeStyles } from "@material-ui/core/styles";
import { AlarmOn, CalendarToday, EventNoteTwoTone, Notes } from "@material-ui/icons";

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
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    props.onChange(index);
  };
  return (
    <div>
      <List
        className={classes.mainList}
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader className={classes.listItem} component="div" id="nested-list-subheader">
            See more
          </ListSubheader>
        }
      >
        <ListItem
          button
          selected={selectedIndex === 0}
          onClick={event => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <TodayIcon className={classes.listItem}></TodayIcon>
          </ListItemIcon>
          <ListItemText className={classes.listItem} color="white" primary="Today" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <Notes className={classes.listItem}></Notes>
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="News" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <AlarmOn className={classes.listItem}></AlarmOn>
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="Count down" />
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <CodeIcon className={classes.listItem}></CodeIcon>
          </ListItemIcon>
          <ListItemText className={classes.listItem} primary="Javascript editor" />
        </ListItem>
      </List>
    </div>
  );
}
export default SideBar;
