import Button from '@mui/material/Button'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { useState } from 'react';

function CreateLink() {
    const [pickedDateTime, setPickedDateTime] = useState(null)

    const sendCreate = async (guess) => {
        try {
            let time = pickedDateTime.format('HH:mm')
            let date = pickedDateTime.format('DD.MM.YYYY')
            const response = await axios.post('http://localhost:8080/create', {date: date, time: time});
            console.log(response.data)
        } catch (error) {
            console.error('Error sending guess:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1>Create Link</h1>
            <DatePicker label="coin toss reveal date" />
            <DateTimePicker label="Basic date time picker" value={pickedDateTime} onChange={(newValue)  => setPickedDateTime(newValue)}/>
            <Button variant="contained" disableElevation onClick={sendCreate}>Create Link</Button>
        </LocalizationProvider>
    );
}

export default CreateLink