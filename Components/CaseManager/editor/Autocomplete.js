/* eslint-disable no-use-before-define */
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Autocomplete({bancos, update, text, nameFiled}) {
  return (
   <div style={{
     width: "230px", 
     marginBottom: "15px"
     //display: "block !important"
      }}>
      <Autocomplete     
        id="free-solo-demo"
        value={text}
        onInputChange={(obj, str)=> update(str)}
        freeSolo
        options={bancos ? bancos.map(option => option.text) : []}
        renderInput={params => (
          (
            <TextField 
              {...params}
              label={nameFiled}
              margin="normal"
              variant="outlined"
              fullWidth
            />
          )
        )}
      />
   </div>
  );
}
