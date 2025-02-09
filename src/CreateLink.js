import { Box, Button, Typography, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import axios from 'axios';
import { useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function CreateLink() {
    const [pickedDateTime, setPickedDateTime] = useState(null)
    const [token, setToken] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [copied, setCopied] = useState(false)

    const sendCreate = async () => {
        if (!pickedDateTime) {
            return;
        }

        try {
            let time = pickedDateTime.format('HH:mm:ss')
            let date = pickedDateTime.format('YYYY-MM-DD')
            const response = await axios.post('http://localhost:8080/create', { date: date, time: time });
            setToken(response.data.token)
        } catch (error) {
            console.error('Error sending create request:', error);
        }
    };

    const getLink = () => {
        return `${window.location.origin}/session/${token}`
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(getLink());
            setOpenSnackbar(true);
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to copy:', error);
        }
    };

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
                        <Box sx={{ textAlign: 'center', mt: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Here's your link:
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 1,
                                    bgcolor: 'grey.100',
                                    p: 2,
                                    borderRadius: 1,
                                    cursor: 'pointer',
                                    width: '100%'
                                }}
                                onClick={handleCopy}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        wordBreak: 'break-all',
                                        flex: 1
                                    }}
                                >
                                    {getLink()}
                                </Typography>
                                <IconButton size="small">
                                    {copied ? (
                                        <CheckIcon fontSize="small" color="success" />
                                    ) : (
                                        <ContentCopyIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </Box>
                        </Box>
                    )}

                    <Snackbar
                        open={openSnackbar}
                        autoHideDuration={2000}
                        onClose={() => setOpenSnackbar(false)}
                        message="Link copied to clipboard!"
                    />
                </Box>
            </Container>
        </LocalizationProvider>
    );
}

export default CreateLink;