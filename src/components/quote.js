import React, { useEffect, useState } from "react";
import "../css/taskBoard.css";
import { makeStyles } from "@material-ui/core/styles";

function Quote(props) {
  const renderQuote = content => {};
  const [quote, setquote] = useState(null);
  const [author, setauthor] = useState(null);
  const textColor = props.darkMode ? "white" : "black";
  useEffect(() => {
    fetch("https://quotes.rest/qod?language=en")
      .then(res => res.json())
      .then(data => {
        setquote(data.contents.quotes[0].quote);
        setauthor(data.contents.quotes[0].author);
      });
  }, []);
  const useStyles = makeStyles({
    text: {
      color: textColor,
    },
  });
  const classes = useStyles();
  return (
    <div>
      <div className="header">
        <h4 className={classes.text}>Today quote</h4>
      </div>
      <p className={`quote-content ${classes.text}`}>"{quote}"</p>
      <div className="author-div">
        <p className={`author-name ${classes.text}`}>--{author}-- </p>
      </div>
    </div>
  );
}

export default Quote;
