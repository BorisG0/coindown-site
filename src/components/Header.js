import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography 
                    variant="h6" 
                    component={Link} 
                    to="/create" 
                    sx={{ 
                        textDecoration: 'none', 
                        color: 'white',
                        flexGrow: 1 
                    }}
                >
                    Coindown
                </Typography>
                <Box>
                    <Button 
                        component={Link} 
                        to="/about" 
                        color="inherit"
                    >
                        About
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header; 