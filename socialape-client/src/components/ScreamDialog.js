import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'

import { connect } from 'react-redux'
import { getScream } from '../redux/actions/data-actions'

import dayjs from 'dayjs'
import { Link } from 'react-router-dom'

// Icons
import { Dialog, DialogContent, CircularProgress, Grid, Typography } from '@material-ui/core';
import theme from '../utils/theme';
import CustomIconButton from '../utils/CustomIconButton';
import { Close, UnfoldMore } from '@material-ui/icons';

const styles = {
    ...theme,
    profileImage: {
        maxWidth: 200,
        height: 200,
        borderRadius: '50%',
        objectFit: 'cover'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '90%'
    },
    expandButton: {
        position: 'absolute',
        left: '90%'
    },
    spinnerDiv: {
        textAlign: 'center',
        marginTop: 50,
        marginBottom: 50
    }
}

class ScreamDialog extends Component {

    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true })
        this.props.getScream(this.props.screamId)
    }

    handleClose = () => {
        this.setState({ open: false })
    }

    render() {
        
        const { 
            classes, 
            scream: { 
                screamId, 
                body, 
                createdAt, 
                likeCount, 
                commentCount, 
                userImage, 
                userHandle 
            }, ui: { 
                loading 
            }
        } = this.props

        const dialogMarkup = loading ? (
            <CircularProgress size={200} />
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="Profile" className={classes.profileImage} />
                </Grid>
                <Grid item sm={7}>
                    <Typography
                        component={Link}
                        color="primary"
                        variant="h5"
                        to={`/user/${userHandle}`}
                    >
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </Grid>
            </Grid>
        )

        return (
            <Fragment>
                <CustomIconButton onClick={this.handleOpen} tip="Expand scream" tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </CustomIconButton>
                <Dialog                    
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullWidth
                    maxWidth="sm"
                >
                    <CustomIconButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <Close />
                    </CustomIconButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }

}

const mapStateToProps = (state) => ({
    scream: state.data.scream,
    ui: state.ui
})

const mapActionsToProps = {
    getScream
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog))