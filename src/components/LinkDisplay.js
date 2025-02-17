import { Box, Typography, IconButton, Snackbar } from '@mui/material';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


export default function LinkDisplay({ link }) {
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [copied, setCopied] = useState(false)

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
        <>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    You can share this link:
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

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2000}
                onClose={() => setOpenSnackbar(false)}
                message="Link copied to clipboard!"
            />
        </>

    )
}