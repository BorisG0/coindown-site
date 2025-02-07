import { Box, Button, Typography, Container } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import axios from 'axios';
import { useState } from 'react';
import { Snackbar, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';

function CreateLink() {
    const [pickedDateTime, setPickedDateTime] = useState(null)
    const [link, setLink] = useState(null)
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [copied, setCopied] = useState(false)

    const sendCreate = async () => {
        try {
            let time = pickedDateTime.format('HH:mm:ss')
            let date = pickedDateTime.format('YYYY-MM-DD')
            const response = await axios.post('http://localhost:8080/create', { date: date, time: time });
            console.log(response.data)
            setLink(response.data)
        } catch (error) {
            console.error('Error sending create request:', error);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(link);
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
            <Container maxWidth="sm">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    gap: 3,
                    mt: 4
                }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create Link
                    </Typography>
                    
                    <DateTimePicker 
                        label="Pick a time for the results to be revealed"
                        value={pickedDateTime} 
                        onChange={(newValue) => setPickedDateTime(newValue)}
                        sx={{ width: '100%' }}
                    />
                    
                    <Button 
                        variant="contained" 
                        size="large"
                        onClick={sendCreate}
                        sx={{ minWidth: 200 }}
                    >
                        Create Link
                    </Button>

                    {link && (
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
                                    cursor: 'pointer'
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
                                    {link}
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