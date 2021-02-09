import React, { useEffect, useState } from "react";
import "../css/taskBoard.css";

function Quote() {
  const renderQuote = content => {};
  const [quote, setquote] = useState(null);
  const [author, setauthor] = useState(null);
  useEffect(() => {
    fetch("https://quotes.rest/qod?language=en")
      .then(res => res.json())
      .then(data => {
        setquote(data.contents.quotes[0].quote);
        setauthor(data.contents.quotes[0].author);
      });
  }, []);
  return (
    <div>
      <div className="header">
        <h4 className="text">Today quote</h4>
      </div>
      <p className="quote-content">"{quote}"</p>
      <div className="author-div">
        <p className="author-name">--{author}-- </p>
      </div>
    </div>
  );
}

export default Quote;
