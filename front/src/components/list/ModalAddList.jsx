import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import BasicSpeedDial from '../common/SpeedDial';
import { Box, Button, DialogContent, TextField } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalAddList({ open, onOpen, onClose, onSubmit }) {
    const [value, setValue] = useState({ title: '', detail: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        onSubmit(data.get('title'), data.get('detail'));
        setValue({ title: '', detail: '' });
    }

    useEffect(() => {
        if (!open)
            setValue({ title: '', detail: '' });
    }, [open]);

    return (
        <React.Fragment>
            <BasicSpeedDial onClick={onOpen} />
            <Dialog
                fullScreen
                open={open}
                onClose={onClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'var(--purple)' }} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Box component={'form'} onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label="Titre"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='title'
                            required
                            autoComplete='off'
                            value={value.title}
                            onChange={(e) => setValue({ ...value, title: e.target.value })}
                        />
                        <TextField
                            margin="dense"
                            id="detail"
                            label="Détail"
                            type="text"
                            fullWidth
                            variant="standard"
                            name='detail'
                            required
                            autoComplete='off'
                            value={value.detail}
                            onChange={(e) => setValue({ ...value, detail: e.target.value })}
                        />
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2, bgcolor: 'var(--purple)', "&:hover": { bgcolor: 'var(--purple)' } }}>Ajouter</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}