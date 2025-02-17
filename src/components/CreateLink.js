import { Box, Button, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import axios from 'axios';
import { useState } from 'react';
import LinkDisplay from './LinkDisplay';
function CreateLink() {
    const [pickedDateTime, setPickedDateTime] = useState(null)
    const [token, setToken] = useState(null)

    const sendCreate = async () => {
        if (!pickedDateTime) {
            return;
        }

        try {
            // Convert to Unix timestamp (seconds)
            const timestamp = Math.floor(pickedDateTime.unix())
            const response = await axios.post(process.env.REACT_APP_SERVER_URL + '/create', { timestamp: timestamp });
            setToken(response.data.token)
        } catch (error) {
            console.error('Error sending create request:', error);
        }
    };

    const getLink = () => {
        return `${window.location.origin}/session/${token}`
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container maxWidth="md">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    mt: 4
                }}>

                    <StaticDateTimePicker
                        value={pickedDateTime}
                        disablePast={true}
                        onChange={(newValue) => {
                            setPickedDateTime(newValue);
                        }}
                        slots={{
                            actionBar: () => null
                        }}
                    />

                    <Button
                        variant="contained"
                        size="large"
                        onClick={sendCreate}
                    >
                        Create Link
                    </Button>

                    {token && (
                        <LinkDisplay link={getLink()} />
                    )}
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default CreateLink;