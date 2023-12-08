import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton, Typography } from '@mui/material';
import Utils from '../utils/Utils';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import BasicSpeedDial from '../components/common/SpeedDial';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function Home({
    getList,
    addList,
}) {
    const [lists, setLists] = useState(null);

    const fetchList = useCallback(() => {
        if (!Utils.isEmpty(getList)) {
            getList((res) => {
                setLists(res.reverse());
            });
        };
    }, [lists, getList]);

    const fetchAddList = (title, detail, createdAt) => {
        if (!Utils.isEmpty(addList)) {
            addList(title, detail, createdAt, (res) => {
                setLists(current => [res, ...current]);
                fetchList();
            });
        };
    };

    useEffect(() => {
        fetchList();
    }, []);

    return (
        <Container maxWidth="sm">
            <div
                style={{
                    boxShadow: "0.7px 0.6px 2.2px rgba(0, 0, 0, 0.02),1.8px 1.4px 5.3px rgba(0, 0, 0, 0.028),3.4px 2.6px 10px rgba(0, 0, 0, 0.035),6px 4.7px 17.9px rgba(0, 0, 0, 0.042),11.3px 8.8px 33.4px rgba(0, 0, 0, 0.05),27px 21px 80px rgba(0, 0, 0, 0.07)",
                    borderRadius: '20px 20px 0 0',
                    marginTop: 70,
                    color: '#fff'
                }}
            >
                <Box
                    sx={{
                        bgcolor: 'var(--purple)',
                        height: '10vh',
                        borderRadius: '20px 20px 0 0',
                        display: 'flex',
                        alignItems: 'center',
                        p: 1,
                    }}
                >
                    <Typography variant='h4' fontWeight={'bold'}>TODO APP</Typography>
                </Box>
                <Box
                    sx={{
                        bgcolor: 'var(--background-purple)',
                        height: '60vh',
                        overflow: 'auto',
                        p: 2,
                    }}
                >
                    {lists && lists.map((elt) => (
                        <Box
                            key={elt.id}
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                bgcolor: '#fff',
                                boxShadow: "0.7px 0.6px 2.2px rgba(0, 0, 0, 0.02),1.8px 1.4px 5.3px rgba(0, 0, 0, 0.028),3.4px 2.6px 10px rgba(0, 0, 0, 0.035),6px 4.7px 17.9px rgba(0, 0, 0, 0.042),11.3px 8.8px 33.4px rgba(0, 0, 0, 0.05),27px 21px 80px rgba(0, 0, 0, 0.07)",
                                borderRadius: 5,
                                p: 2,
                                "&:not(:first-of-type)": { mt: 2 }
                            }}
                        >
                            <div>
                                <Typography color={'var(--purple)'} variant='body1' fontWeight={'bold'}>{elt.title}</Typography>
                                <Typography color={'black'} variant='subtitle1'>{elt.detail}</Typography>
                            </div>
                            <div>
                                <IconButton disableRipple>
                                    <EditOutlinedIcon sx={{ color: 'var(--purple)' }} />
                                </IconButton>
                                <IconButton disableRipple>
                                    <DeleteOutlineOutlinedIcon sx={{ color: 'var(--purple)' }} />
                                </IconButton>
                                <IconButton disableRipple>
                                    {elt.done
                                        ? <CheckCircleRoundedIcon sx={{ color: 'var(--purple)' }} />
                                        : <CheckCircleOutlineRoundedIcon sx={{ color: 'var(--purple)' }} />
                                    }
                                </IconButton>
                            </div>
                        </Box>
                    ))}
                </Box>
            </div>
            <BasicSpeedDial
                onClick={() => {
                    fetchAddList('', '', new Date);
                }}
            />
        </Container>
    );
}