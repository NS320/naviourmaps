import React, { Component, createRef } from 'react'

class BackButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => {this.props.setGoalAddress({address: "", lat: null, lng: null})} }
                >
                </button>
            </div>
        )
    }
}

export default BackButtons;
