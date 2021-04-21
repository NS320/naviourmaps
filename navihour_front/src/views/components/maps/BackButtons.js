import React, { Component, createRef } from 'react'

class BackButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button
                    onClick={
                        () => {
                            this.props.setStartAddress({ address: "", lat: null, lng: null })
                            this.props.setGoalAddress({ address: "", lat: null, lng: null })
                            this.props.setRestaurants({ restaurants: []})
                        }
                    }
                >戻る
                </button>
            </div>
        )
    }
}

export default BackButtons;
