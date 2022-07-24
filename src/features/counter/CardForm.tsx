import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { useState } from 'react';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { ICard, addCard } from './cardlistSlice';
import cssColors from '../../cssColors';
cssColors.unshift("")

export default function CardForm() {
  const initValues = { name: "", color: "" }
  const [formData, setFormData] = useState<ICard>(initValues);

  function handleFormChange(event: any): void {
    const { name, value, type, checked } = event.target;
    console.log({ name, value, type, checked })
    setFormData((prevFormData: any) => {
      return {
        ...prevFormData, [name]: value
      }
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault();

    console.log({ formData })
    if (!formData.name) {
      return toast.error("Please Fill in name field.")
    }

    if (!formData.color) {
      return toast.error("Please select color.")
    }

    dispatch(addCard(formData));
    toast.success("Card Added");
    setFormData(initValues);
  }

  const dispatch = useAppDispatch();

  return (
    <Box>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="name"
          label="Card Name"
          name="name"
          autoFocus
          value={formData.name}
          onChange={handleFormChange}
        />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Color</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="Select-Color"
            value={formData.color}
            label="Select Color"
            name="color"
            onChange={handleFormChange}
          >
            <MenuItem value=""></MenuItem>
            {cssColors.map(
              (color, index) => <MenuItem value={color} key={index}>{color}</MenuItem>
            )}

          </Select>
        </FormControl>

        <Button
          disabled={!(formData.name && formData.color)}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 1, mb: 2 }}
          startIcon={<AddIcon />}
        >
          Add Card
        </Button>
      </Box>
    </Box>
  );
}
