import React, { Component, createRef } from 'react'

class HomeButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button
                    onClick={() => {this.props.setGoalAddress({address: "うわぁ、浪人だぁ", lat: 3, lng: 3})} }
                >
                    みつおが浪人するボタン(子が親(Home)に渡す)
                </button>
            </div>
        )
    }
}

export default HomeButtons;
