//Part 2

// Card.test.js
import { render } from '@testing-library/react';
import Card from './Card';

test('renders without crashing', () => {
  render(<Card src="image.jpg" alt="test image" />);
});
// Carousel.test.js
import { render } from '@testing-library/react';
import Carousel from './Carousel';

test('renders without crashing', () => {
  render(<Carousel />);
});
//card component
import { render } from '@testing-library/react';
import Card from './Card';
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(<Card src="image.jpg" alt="test image" />).toJSON();
  expect(tree).toMatchSnapshot();
});
//carousel component
import { render } from '@testing-library/react';
import Carousel from './Carousel';
import renderer from 'react-test-renderer';

test('matches snapshot', () => {
  const tree = renderer.create(<Carousel />).toJSON();
  expect(tree).toMatchSnapshot();
});

//Part 3

//failing test for carousel component
import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

test('left arrow moves to the previous image', () => {
  render(<Carousel />);
  fireEvent.click(screen.getByTestId('right-arrow'));
  fireEvent.click(screen.getByTestId('left-arrow'));
  expect(screen.getByAltText(/image 1/i)).toBeInTheDocument();
});

//fixing bug in the code
import React, { useState } from 'react';
import Card from './Card';
import leftArrow from './left-arrow.png';
import rightArrow from './right-arrow.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  const goLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <div className="carousel">
      <img
        src={leftArrow}
        alt="left arrow"
        onClick={goLeft}
        data-testid="left-arrow"
      />
      <Card src={images[currentIndex]} alt={`image ${currentIndex + 1}`} />
      <img
        src={rightArrow}
        alt="right arrow"
        onClick={goRight}
        data-testid="right-arrow"
      />
    </div>
  );
};

export default Carousel;

//Part 4

//failing test carousel component
import { render, screen, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

test('hides left arrow on first image', () => {
  render(<Carousel />);
  expect(screen.queryByTestId('left-arrow')).not.toBeInTheDocument();
});

test('hides right arrow on last image', () => {
  render(<Carousel />);
  fireEvent.click(screen.getByTestId('right-arrow'));
  fireEvent.click(screen.getByTestId('right-arrow'));
  expect(screen.queryByTestId('right-arrow')).not.toBeInTheDocument();
});

//fixing bug in code
import React, { useState } from 'react';
import Card from './Card';
import leftArrow from './left-arrow.png';
import rightArrow from './right-arrow.png';

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];

  const goLeft = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const goRight = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, images.length - 1));
  };

  return (
    <div className="carousel">
      {currentIndex > 0 && (
        <img
          src={leftArrow}
          alt="left arrow"
          onClick={goLeft}
          data-testid="left-arrow"
        />
      )}
      <Card src={images[currentIndex]} alt={`image ${currentIndex + 1}`} />
      {currentIndex < images.length - 1 && (
        <img
          src={rightArrow}
          alt="right arrow"
          onClick={goRight}
          data-testid="right-arrow"
        />
      )}
    </div>
  );
};

export default Carousel;

