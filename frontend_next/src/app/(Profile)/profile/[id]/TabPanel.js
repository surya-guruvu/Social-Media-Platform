
import React from "react";
import { Box } from "@mui/material";

export default function TabPanel(props) {
    const { children, value, index,pad, ...other } = props;
  
    return (
          <Box
            role="tabpanel"
            hidden={value !== index}
            {...other}
            sx={{
              padding: pad,
            }}
          >
              {children}
          </Box>
    );
  }