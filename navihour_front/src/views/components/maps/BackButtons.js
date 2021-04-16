import React, { Component, createRef } from 'react'

class BackButtons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <button
<<<<<<< HEAD:navihour_front/src/views/components/maps/BackButtons.js
                    onClick={() => {this.props.setGoalAddress({address: "", lat: null, lng: null})} }
                >
=======
                    onClick={() => {this.props.setGoalAddress({address: "うわぁ、浪人だぁ", lat: 2, lng: 2})} }
                >
                    が浪人するボタン(子が親(Home)に渡す)
>>>>>>> 4cb48a98a0e21dd9725996eb048775102926bdfa:navihour_front/src/views/components/maps/HomeButtons.js
                </button>
            </div>
        )
    }
}

export default BackButtons;
