import {
  Box,
  Card,
  Button,
  useMediaQuery,
  useTheme,
  CardContent,
  Typography,
  Rating,
  CardActions,
  Collapse,
} from "@mui/material";
import { useGetProductsQuery } from "@/state/api";
import Header from "@/components/Header";
import { useState } from "react";
const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  catagory,
  supply,
  stat,
}) => {
  const { palette } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundColor: palette.background.alt,
        backgroundImage: "none",
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          fontSize={"14px"}
          color={palette.secondary[700]}
          gutterBottom
        >
          {catagory}
        </Typography>
        <Typography component={"div"} variant="h5">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem", color: palette.secondary[400] }}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout={"auto"}
        unmountOnExit
        sx={{
          color: palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id {_id}</Typography>
          <Typography>Supply Left {supply}</Typography>
          <Typography>
            Yearly Sales this year {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold this Year {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};
const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title={"PORODUCTS"} subtitle={"see your list of products..."} />
      {data || !isLoading ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={"repeat(4, minmax(0,1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": {
              gridColumn: isNonMobileScreens ? undefined : "span 4",
            },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              supply,
              category,
              stat,
              price,
              description,
              rating,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                supply={supply}
                category={category}
                stat={stat}
                price={price}
                description={description}
                rating={rating}
              />
            )
          )}
        </Box>
      ) : (
        <>Loadding....</>
      )}
    </Box>
  );
};

export default Products;
