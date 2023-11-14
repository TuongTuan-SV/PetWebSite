import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import {
  getAdminProducts,
  setAdminCategory,
  setAdminSearch,
} from '../../../../redux/slices/productSlice';
const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

export default function CategorySelect() {
  const dispatch = useAppDispatch();
  const { Categories } = useAppSelector((state) => state.Categories);
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const category = event.target.value.map((item: any) => {
      return `Category[all]=${item}`;
    });
    dispatch(setAdminCategory(category));
    dispatch(setAdminSearch(''));
    dispatch(getAdminProducts());
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    console.log(category);
  };

  return (
    <div>
      <FormControl sx={{ width: 200, height: 25 }}>
        <InputLabel id="demo-multiple-checkbox-label" style={{ top: '-14px' }}>
          Category...
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ width: 200, height: 25 }}
        >
          {Categories.map((name: any) => (
            <MenuItem key={name._id} value={name.Name}>
              <Checkbox checked={personName.indexOf(name.Name) > -1} />
              <ListItemText primary={name.Name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
