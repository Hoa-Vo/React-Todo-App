/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';
import '../css/new.css';

function Feed(props) {
   const color = props.darkMode ? 'white' : 'black';

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
               <a
                  href={element.url}
                  target="_blank"
                  className={`new-title ${classes.text}`}
               >
                  {element.title}
               </a>
               <p className={`new-description ${classes.text}`}>
                  {element.description}
               </p>
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
               <h2>Something went wrong, try again later</h2>
            </div>
         </div>
      );
   }
}

function New(props) {
   const [newArr, setNewArr] = useState([]);

   const [loading, setLoading] = useState(true);

   const color = props.darkMode ? 'white' : 'black';

   const useStyles = makeStyles({
      text: {
         color: color,
      },
   });

   const classes = useStyles();

   useEffect(() => {
      async function fetchData() {
         if (newArr.length < 1) {
            const temp = new Date();
            temp.setDate(temp.getDate() - 1);
            const date = temp.toLocaleDateString();
            const res = await fetch(
               `https://gnews.io/api/v4/top-headlines?lang=en&country=us&from=${date}&token=ee807850d744d8f6a39386f4ecc28ec4`
            );
            const data = await res.json();
            setLoading(false);
            setNewArr(data.articles);
         }
      }
      fetchData();
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
