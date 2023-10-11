const { default: styled } = require("@emotion/styled");
const { Box } = require("@mui/material");

const FlexBetween = styled(Box)({//styled is a method to reuse styles or css in a component like manner
    display:"flex",
    justifyContent: "space-between",
    alignItems: "center"
}) 

export default FlexBetween;