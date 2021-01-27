import React from "react";
import "../css/body.css";
import Fab from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
function Body() {
  return (
    <div className="container main-body">
      <div className="row">
        <div className="col">
          <Box>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
          </Box>
        </div>
        <div className="col">
          <p>col1</p>
        </div>
        <div className="col">
          <p>col1</p>
        </div>
      </div>
    </div>
  );
}

export default Body;
