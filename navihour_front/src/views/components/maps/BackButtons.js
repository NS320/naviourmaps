import React, { Component, createRef } from 'react'
import Button from '@material-ui/core/Button';

class BackButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Button
                    className='button-size'
                    onClick={
                        () => {
                            this.props.setStartAddress({ address: "", lat: null, lng: null })
                            this.props.setGoalAddress({ address: "", lat: null, lng: null })
                            this.props.setRestaurants({ restaurants: []})
                        }
                    }
                    variant="contained"
                    color='default'
                >Clear
                </Button>
            </div>
        )
    }
}

export default BackButtons;
