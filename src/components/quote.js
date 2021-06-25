import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../css/taskBoard.css';

function Quote(props) {
   const [quote, setQuote] = useState(null);

   const [author, setAuthor] = useState(null);

   const textColor = props.darkMode ? 'white' : 'black';

   const useStyles = makeStyles({
      text: {
         color: textColor,
      },
   });

   const classes = useStyles();

   useEffect(() => {
      fetch('https://quotes.rest/qod?language=en')
         .then(res => res.json())
         .then(data => {
            setQuote(data.contents.quotes[0].quote);
            setAuthor(data.contents.quotes[0].author);
         });
   }, []);

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
