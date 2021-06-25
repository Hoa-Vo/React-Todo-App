import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import {
   Button,
   CircularProgress,
   makeStyles,
   Snackbar,
} from '@material-ui/core';
import { FileCopy, PlayArrow } from '@material-ui/icons';
import axios from 'axios';

function MonacoEditor(props) {
   const [openSnackBar, setOpenSnackBar] = useState(false);

   const [codeResult, setCodeResult] = useState('');

   const [loading, setLoading] = useState(false);

   const editorRef = useRef(null);

   const theme = props.darkMode ? 'vs-dark' : 'light';

   const color = props.darkMode ? 'white' : 'black';

   const bg = props.darkMode ? '#2a2a2a' : '#f9f9f9';

   const useStyles = makeStyles({
      header: {
         marginBottom: '20px',
      },
      icon: {
         color: 'white',
      },
      buttonDiv: {
         display: 'flex',
         marginTop: '20px',
      },
      runCodeBtn: {
         marginRight: '20px',
      },
      editorDiv: {
         marginRight: '10px',
         border: '1px solid black',
         padding: '10px',
      },
      text: {
         color: color,
      },
      result: {
         height: '200px',
         background: bg,
         marginRight: '20px',
         padding: '10px',
         marginTop: '10px',
      },
      consoleText: {
         color: color,
      },
      loading: {
         display: 'flex',
         alignItems: 'center',
         height: '40%',
         justifyContent: 'center',
         flexDirection: 'column',
      },
   });

   const classes = useStyles();

   const getEditorContent = (value, event) => {
      editorRef.current = value;
   };

   const runCode = async () => {
      setLoading(true);
      const code = editorRef.current.getValue();
      const result = await axios({
         url: 'https://cors-anywhere.herokuapp.com/https://api.jdoodle.com/v1/execute',
         method: 'post',
         data: {
            clientId: '494836447e17dfc652dd289206f2a3e9',
            clientSecret:
               '31996e80d938a5f13afd48320f1790d5f29bf67e1fca0ea47c0eaa05126142c3',
            script: code,
            versionIndex: '1',
            language: 'nodejs',
         },
         proxy: {
            protocol: 'https',
         },
      });
      setCodeResult(result.data.output);
      setLoading(false);
   };

   const copyCode = () => {
      const copyContent = editorRef.current.getValue();

      navigator.clipboard.writeText(copyContent).then(
         function () {
            setOpenSnackBar(true);
         },
         function () {
            /* clipboard write failed */
         }
      );
   };

   const handleSnackBarClose = (event, reason) => {
      setOpenSnackBar(false);
   };

   return (
      <div>
         <div className={classes.header}>
            <h4 className={classes.text}>Editor</h4>
         </div>
         <div>
            <div className={classes.editorDiv}>
               <Editor
                  theme={theme}
                  onMount={getEditorContent}
                  height="40vh"
                  defaultLanguage="javascript"
                  defaultValue="//write your code here"
               />
            </div>

            <div className={classes.result}>
               <p className={classes.text}>CONSOLE</p>
               {loading ? (
                  <div className={classes.loading}>
                     <p>Executing...</p>
                     <CircularProgress disableShrink></CircularProgress>
                  </div>
               ) : (
                  <div>
                     <p>{codeResult}</p>
                  </div>
               )}
            </div>
            <div className={classes.buttonDiv}>
               <Button
                  onClick={runCode}
                  className={classes.runCodeBtn}
                  color="primary"
                  variant="contained"
                  endIcon={<PlayArrow className={classes.icon}></PlayArrow>}
               >
                  Run code
               </Button>
               <Button
                  onClick={copyCode}
                  color="primary"
                  variant="contained"
                  endIcon={<FileCopy className={classes.icon}></FileCopy>}
               >
                  Copy code
               </Button>
               <Snackbar
                  onClose={handleSnackBarClose}
                  anchorOrigin={{
                     vertical: 'bottom',
                     horizontal: 'left',
                  }}
                  open={openSnackBar}
                  autoHideDuration={1000}
                  message="Copy to clipboard !!!"
               />
            </div>
         </div>
      </div>
   );
}

export default MonacoEditor;
