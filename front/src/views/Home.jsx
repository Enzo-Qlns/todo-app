import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton, Tab, Tabs, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ModalAddList from '../components/list/ModalAddList';
import ModalEditList from '../components/list/ModalEditList';
import Utils from '../utils/Utils';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Loader from '../components/common/Loader';

export default function Home({
    getList,
    getDoneList,
    addList,
    deleteList,
    patchDoneList,
    updateList,
}) {
    const [initialRequestAs200, setinitialRequestAs200] = useState(false);
    const [lists, setLists] = useState(null);
    const [openModalAddList, setOpenModalAddList] = useState(false);
    const [openModalEditList, setOpenModalEditList] = useState(false);
    const [toggleValue, setToggleValue] = useState(0);
    const [selectedValueToEditList, setSelectedValueToEditList] = useState('');

    const fetchList = useCallback(() => {
        setinitialRequestAs200(false);
        if (!Utils.isEmpty(getList)) {
            getList((res) => {
                setLists(res.reverse());
                setToggleValue(0);
                setinitialRequestAs200(true);
            });
        };
    }, [getList]);

    const fetchGetDoneList = () => {
        if (!Utils.isEmpty(getDoneList)) {
            getDoneList((res) => {
                setLists(res.reverse());
            });
        };
    };

    const fetchAddList = (title, detail, createdAt) => {
        if (!Utils.isEmpty(addList)) {
            addList(title, detail, createdAt, () => {
                fetchList();
                setOpenModalAddList(false);
            });
        };
    };

    const fetchDeleteList = (id) => {
        if (!Utils.isEmpty(deleteList)) {
            deleteList(id, () => {
                fetchList();
            });
        };
    };

    const fetchPatchDoneList = (listId, done) => {
        if (!Utils.isEmpty(patchDoneList)) {
            patchDoneList(listId, done, () => {
                fetchList();
            });
        };
    };

    const fetchUpdateList = (listId, title, detail) => {
        if (!Utils.isEmpty(updateList)) {
            updateList(listId, title, detail, () => {
                fetchList();
                setOpenModalEditList(false);
            });
        };
    };

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return (
        <Container maxWidth="sm">
            <div
                style={{
                    boxShadow: "0.7px 0.6px 2.2px rgba(0, 0, 0, 0.02),1.8px 1.4px 5.3px rgba(0, 0, 0, 0.028),3.4px 2.6px 10px rgba(0, 0, 0, 0.035),6px 4.7px 17.9px rgba(0, 0, 0, 0.042),11.3px 8.8px 33.4px rgba(0, 0, 0, 0.05),27px 21px 80px rgba(0, 0, 0, 0.07)",
                    borderRadius: '20px 20px 0 0',
                    marginTop: 50,
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
                        height: '65vh',
                        overflow: 'auto',
                        p: 2,
                    }}
                >
                    {!initialRequestAs200
                        ? <Loader />
                        : Utils.isEmpty(lists)
                            ? <Typography variant='h6' color={'grey'} textAlign={'center'}>Aucune liste</Typography>
                            : lists.map((elt) => (
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
                                        <IconButton
                                            disableRipple
                                            onClick={() => {
                                                setOpenModalEditList(true);
                                                setSelectedValueToEditList(elt);
                                            }}
                                        >
                                            <EditOutlinedIcon sx={{ color: 'var(--purple)' }} />
                                        </IconButton>
                                        <IconButton disableRipple onClick={(id) => fetchDeleteList(elt.id)}>
                                            <DeleteOutlineOutlinedIcon sx={{ color: 'var(--purple)' }} />
                                        </IconButton>
                                        <IconButton disableRipple onClick={() => fetchPatchDoneList(elt.id, !elt.done)}>
                                            {elt.done
                                                ? <CheckCircleRoundedIcon sx={{ color: 'var(--purple)' }} />
                                                : <CheckCircleOutlineRoundedIcon sx={{ color: 'var(--purple)' }} />
                                            }
                                        </IconButton>
                                    </div>
                                </Box>
                            ))
                    }
                </Box>
                <Tabs
                    aria-label="icon label tabs example"
                    sx={{
                        bgcolor: '#fff',
                        boxShadow: "0.7px 0.6px 2.2px rgba(0, 0, 0, 0.02),1.8px 1.4px 5.3px rgba(0, 0, 0, 0.028),3.4px 2.6px 10px rgba(0, 0, 0, 0.035),6px 4.7px 17.9px rgba(0, 0, 0, 0.042),11.3px 8.8px 33.4px rgba(0, 0, 0, 0.05),27px 21px 80px rgba(0, 0, 0, 0.07)",
                    }}
                    centered
                    value={toggleValue}
                    onChange={(_, value) => {
                        setToggleValue(value);
                        if (value === 1)
                            fetchGetDoneList();
                        else
                            fetchList();
                    }}
                >
                    <Tab disableRipple icon={<FormatListBulletedOutlinedIcon />} />
                    <Tab disableRipple icon={<DoneOutlinedIcon />} />
                </Tabs>
            </div>

            <ModalAddList
                onSubmit={(title, detail) => {
                    fetchAddList(title, detail, new Date());
                }}
                open={openModalAddList}
                onOpen={() => setOpenModalAddList(true)}
                onClose={() => setOpenModalAddList(false)}
            />

            <ModalEditList
                open={openModalEditList}
                selectedValueToEditList={selectedValueToEditList}
                title={selectedValueToEditList.title}
                detail={selectedValueToEditList.detail}
                onClose={() => setOpenModalEditList(false)}
                onSubmit={(title, detail) => {
                    fetchUpdateList(selectedValueToEditList.id, title, detail);
                }}
            />
        </Container>
    );
}