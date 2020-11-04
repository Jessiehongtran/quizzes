import React from 'react';
import { quizzes } from '../data/quizData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './quiz.css'

export default class Quiz extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            quizzes: quizzes,
            quizID: this.props.match.params.quizID,
            isCorrect: null,
            ans: "",
            ques: "",
            ansID: 0,
            showTrueFalse: false
        }
        this.onChangeAnswer = this.onChangeAnswer.bind(this)
        this.onSubmitAnswer = this.onSubmitAnswer.bind(this)
        this.redirect = this.redirect.bind(this)
    }

    onChangeAnswer(e, ansID, ques, isCorrect){
        this.setState({
            isCorrect: isCorrect,
            ans: e.target.value,
            ques: ques,
            ansID: ansID
        })
    }

    redirect(){
        if (parseInt(this.props.match.params.quizID) +1 <= quizzes.length){
            this.props.history.push(`/quiz/${parseInt(this.props.match.params.quizID) +1}`)
        }
        else {
            this.props.history.push('/result')
        }
        this.setState({showTrueFalse: false})
    }

    onSubmitAnswer(e){
        e.preventDefault()
        const { ques, ans, isCorrect, quizID } = this.state
        this.props.scoreUpdate(isCorrect)
        this.props.saveResponses(ques, ans)
        this.props.updateProgress()
        this.setState({showTrueFalse: true})
        setTimeout(this.redirect, 1000)
    }


    render(){

        const { quizzes, quizID, isCorrect, ansID, showTrueFalse } = this.state

        const quiz = quizzes.filter(quiz => quiz.id == this.props.match.params.quizID)[0]

        console.log('showTrueFalse', showTrueFalse, 'isCorrect', isCorrect, 'ansID', ansID )

        return (
            <div className="container">
                <div className="quiz">
                    <h3 className="question">{quiz.question}</h3>
                    <div className="answers">
                        {quiz.answers.map(ans => 
                            <ul key={ans.text}>
                                <li>
                                    <input 
                                        type="radio"
                                        value={ans.text}
                                        name={quiz.question}
                                        onChange={e => this.onChangeAnswer(e, ans.id, quiz.question, ans.isCorrect)}
                                    />
                                    <span>
                                        {ans.text}
                                    </span>
                                    {
                                    showTrueFalse
                                    ? isCorrect !== null 
                                        ? ansID === ans.id
                                            ? isCorrect === true
                                                ? <FontAwesomeIcon
                                                        icon = {faCheckCircle}
                                                        className="true"
                                                    />
                                                : <FontAwesomeIcon
                                                        icon = {faTimesCircle}
                                                        className="false"
                                                    />
                                            : null
                                        : null
                                    : null
                                    } 
                                </li>
                            </ul>)}
                    </div>
                </div>
                <button onClick={e => this.onSubmitAnswer(e)}>Next</button>
            </div>
        )
    }
}