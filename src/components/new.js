import React, { useEffect, useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../css/new.css";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

function Feed(props) {
  const color = props.darkMode ? "white" : "black";
  const useStyles = makeStyles({
    text: {
      color: color,
    },
  });
  const classes = useStyles();
  try {
    let content = props.news.map(element => (
      <div className="new-item">
        <div className="new-img">
          <img className="new-img" src={element.image}></img>
        </div>
        <div className="new-content">
          <a href={element.url} target="_blank" className={`new-title ${classes.text}`}>
            {element.title}
          </a>
          <p className={`new-description ${classes.text}`}>{element.description}</p>
          <p className={`new-author ${classes.text}`}>{element.author}</p>
        </div>
      </div>
    ));
    return <div>{content}</div>;
  } catch (err) {
    console.log(err);
    return (
      <div className="new-item">
        <div className="new-content">
          <h2>Somthing went wrong, try again later</h2>
        </div>
      </div>
    );
  }
}
function New(props) {
  const [newArr, setNewArr] = useState([]);
  const [loading, setLoading] = useState(true);
  const color = props.darkMode ? "white" : "black";
  const useStyles = makeStyles({
    text: {
      color: color,
    },
  });
  const classes = useStyles();
  useEffect(async () => {
    if (newArr.length < 1) {
      const res = await fetch(
        "https://gnews.io/api/v4/top-headlines?lang=en&token=ee807850d744d8f6a39386f4ecc28ec4"
      );
      const data = await res.json();
      console.log(data);
      setLoading(false);
      setNewArr(data.articles);
    }
  }, []);

  return (
    <div className="main-news">
      <div>
        <h4 className={classes.text}>Today news</h4>
      </div>
      {loading ? (
        <div className="loader">
          <CircularProgress disableShrink />
        </div>
      ) : (
        <Feed darkMode={props.darkMode} news={newArr}></Feed>
      )}
    </div>
  );
}

export default New;
