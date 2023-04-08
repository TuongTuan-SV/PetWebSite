import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import './ProceSlider.css';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getProducts, sePrice } from '../../../redux/slices/productSlice';
function valuetext(value: number) {
  return `${value}°C`;
}

export default function PriceSlider() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.Products);
  const [value, setValue] = React.useState<any[]>([
    search.Minprice,
    search.Maxprice,
  ]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    dispatch(sePrice(newValue as number[]));
  };
  const filter = () => {
    dispatch(getProducts());
  };
  return (
    <div className="PriceSlider">
      <Box>
        <Slider
          getAriaLabel={() => 'Temperature range'}
          value={search.price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          min={search.Minprice}
          step={1}
          max={search.Maxprice}
        />
      </Box>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className="price_label">
          Price: <span className="from">${search.price[0]}</span> —{' '}
          <span className="to">${search.price[1]}</span>
        </div>
        <button type="submit" className="button" onClick={filter}>
          Filter
          <KeyboardArrowRightIcon className="FilterBtn" />
        </button>
      </div>
    </div>
  );
}
