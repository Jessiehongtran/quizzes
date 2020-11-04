import React from 'react';
import { Route, Link } from 'react-router-dom';
import { quizzes } from './data/quizData';
import Quiz from './quiz/quiz';
import Result from './result/result'
import './App.css';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      total_question: quizzes.length,
      responses: [],
      score: 0
    }
    this.scoreUpdate = this.scoreUpdate.bind(this)
    this.saveResponses = this.saveResponses.bind(this)
  }

  scoreUpdate(isCorrect){
    if (isCorrect){
      this.setState({score: this.state.score + 1})
    }
  }

  saveResponses(ques, ans){
    this.setState({
      responses: [
        ...this.state.responses,
        {
          question: ques,
          answer: ans
        }
      ]
    })
  }

  render(){

    const { score, responses, total_question } = this.state
    console.log('responses', responses)
    console.log('score', score)

    return (
      <div className="App">
        <Route 
          exact path="/"
          render = {
            props => {
              return (
                <>
                  <h1>Welcome to quiz family</h1>
                  <Link to="/quiz/1">Click here to start</Link>
                </>
              )
            }
          }
        />
        <Route 
          exact path="/quiz/:quizID"
          render = {
            props => {
              return (
                <>
                  <Quiz 
                    {...props}
                    scoreUpdate={this.scoreUpdate}
                    saveResponses={this.saveResponses}
                  />
                </>
              )
            }
          }
        />
        <Route 
          exact path="/result"
          render = {
            props => {
              return (
                <>
                  <Result 
                    {...props}
                    score = {score}
                    total_question = {total_question}

                  />
                </>
              )
            }
          }
        />
      </div>
    );
  }
}


export default App;