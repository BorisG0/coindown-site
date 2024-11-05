import Button from '@mui/material/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';



function CreateLink() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <h1>Create Link</h1>
      <DatePicker label="coin toss reveal date"/>
      <DateTimePicker label="Basic date time picker" />
      <Button variant="contained" disableElevation>Create Link</Button>
    </LocalizationProvider>
  );
}

export default CreateLink