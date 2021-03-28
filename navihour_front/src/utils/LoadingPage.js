import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper } from '@material-ui/core';
import "../App.css";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

export default function LoadingPage() {
    const classes = useStyles();

    return (
        <Paper className="screen-lock">
            <div className={classes.root}>
                <CircularProgress className="center-of-center"/>
            </div>
        </Paper>    
    );
}