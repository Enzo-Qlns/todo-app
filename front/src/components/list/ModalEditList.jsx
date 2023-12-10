import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Button, DialogContent, TextField } from '@mui/material';
import Utils from '../../utils/Utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEditList({ open, title, detail, onClose, onSubmit }) {
    const [titleValue, setTitleValue] = useState(title);
    const [detailValue, setDetailValue] = useState(detail);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        onSubmit(data.get('title'), data.get('detail'));
    };

    const close = () => {
        onClose();
        setTitleValue('');
        setDetailValue('');
    }

    return (
        <>
            <Dialog
                fullScreen
                open={open}
                onClose={close}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative', bgcolor: 'var(--purple)' }} >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={close}
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
                            value={Utils.isEmpty(titleValue) ? title : titleValue}
                            onChange={(e) => setTitleValue(e.target.value)}
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
                            value={Utils.isEmpty(detailValue) ? detail : detailValue}
                            onChange={(e) => setDetailValue(e.target.value)}
                        />
                        <Button type='submit' variant='contained' fullWidth sx={{ mt: 2, bgcolor: 'var(--purple)', "&:hover": { bgcolor: 'var(--purple)' } }}>Ajouter</Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </>
    );
}