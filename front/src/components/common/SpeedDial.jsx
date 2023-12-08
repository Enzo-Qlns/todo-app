import * as React from 'react';
import { IconButton } from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

export default function BasicSpeedDial({ onClick }) {
    return (
        <IconButton
            sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                background: 'var(--purple)',
                color: '#fff',
                width: 60,
                height: 60,
                "&:hover": { background: 'var(--purple)' },
            }}
            centerRipple={false}
            onClick={onClick}
        >
            <AddRoundedIcon fontSize='medium' />
        </IconButton >
    );
}