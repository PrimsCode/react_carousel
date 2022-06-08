import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test
it("render without crashing", function(){
  render(<Carousel />);
})

//snapshot test
it("matches snapshot", function() {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click the left arrow", function() {
  const {queryByTestId, queryByAltText} = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect the second image to show
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();

  //move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //expect the first image to show, but not the third
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Josh Post on Unsplash")).not.toBeInTheDocument();

})

it("hides the arrow appropriately", function() {
  const {queryByTestId, queryByAltText} = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow");
  const leftArrow = queryByTestId("left-arrow");

  //expect the first image to show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();

  //expect the right arrow to show and left arrow to be hidden
  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).toHaveClass("hidden");

  fireEvent.click(rightArrow);
  //expect the second image to show
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  //expect both arrrows to show
  expect(rightArrow).not.toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");

  fireEvent.click(rightArrow);
  //expect the third image to show
  expect(queryByAltText("Photo by Josh Post on Unsplash")).toBeInTheDocument();

  //expect the left arrow to show and the right arrow to be hidden
  expect(rightArrow).toHaveClass("hidden");
  expect(leftArrow).not.toHaveClass("hidden");
  
})

