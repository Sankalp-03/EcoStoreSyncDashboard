import React, { useState } from 'react';
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery} from "@mui/material";
import Header from "components/Header";
import { useGetProductsQuery } from "state/api";
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card 
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt, 
        // instead of hard-coding the colors we use theme because we need to shift the themes, hard-coding it might create a problem
        borderRadius: "0.55rem"
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom> 
          {/* gutterbottom if true the typography will have a bottom margin else not */}
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb:"1.5rem" }} color={theme.palette.secondary[400]}>
          {Number(price).toFixed(2)}
          {/* set the price to two decimal's, being it in string then converting it to number */}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions> 
      {/* The MUI CardActions component is used to display a group of actions at the bottom of a card. It is typically used to contain buttons
      , such as a button to delete the card or a button to open a modal dialog. */}
        <Button
          variant= "primary"
          size= "small"
          onClick = {() => setIsExpanded(!isExpanded)}
        >
          See more
        </Button>
      </CardActions>
      <Collapse 
        in={isExpanded} // whether or not the content is collapsed
        timeout = "auto" // number that gives the duration of the transition
        unmountOnExit // boolean value that controls whther or not the content should be unmounted when collapsed
        sx={{
          color:theme.palette.neutral[300]
        }}
        >
          <CardContent>
            <Typography>id: { _id }</Typography>
            <Typography>Supply Left: { supply }</Typography>
            <Typography>Yearly Sales This Year: { stat.yearlySalesTotal }</Typography>
            <Typography>Yearly Units Sold This Year: { stat.yearlyTotalSoldUnits }</Typography>
          </CardContent>
        {/* Collapse component allows one to collapse/expand component */}
      </Collapse>
    </Card>
  )
}
const Products = () => {
  const { data, isLoading } = useGetProductsQuery(); // data - data coming from the backend, isLoading - boolean that tells whether the data has come from the backend or not.
  const isNonMobile = useMediaQuery("(min-width: 1000px)")
  console.log("data",data);
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="PRODUCTS" subtitle="This is your list of products" />
        { data || !isLoading ? (
        <Box 
          mt="20px" 
          display="grid" 
          gridTemplateColumns= "repeat( 4, minmax( 0, 1fr ))" 
          justifyContent="space-between" 
          rowGap="20px" 
          columnGap="1.33%" 
          sx={{
            "& > div" : // by doing this we are targeting the immediate child of this Box component
            {gridColumn: isNonMobile ? undefined : "span 4"}}} // takes the entire width for mobile screens
          >
          {/* repeat(4,minmax(0,1fr))- specifies that each column must be at least 0px wide and can grow or shrink to fill the available space. */}
              { data.map(({
                _id,
                name,
                description,
                price,
                rating,
                category,
                supply,
                stat
              }) => (
                <Product
                  key = {_id} 
                  _id = {_id}
                  name = {name}
                  description = {description}
                  price = {price}
                  rating = {rating}
                  category = {category}
                  supply = {supply}
                  stat = {stat}
                />
              ))}
            </Box>) :  (<>Loading....</>)}
    </Box>
  )
}

export default Products;