import React from 'react';
import './result.css'

export default class Result extends React.Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const { score, total_question } = this.props

        return (
            <div className="container">
                <p className="result">
                    {(score/total_question)*100} %
                </p>
                {(score/total_question)*100 <80 
                    ? <div className="fail">
                        <p>You fail :(</p>
                        <button onClick={() => this.props.history.push('/')}>Start again</button>
                      </div>
                    : <p className="pass">You pass :)</p>}
            </div>
        )
    }
}