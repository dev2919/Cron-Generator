import React, {Component} from 'react';
import './App.css';
import InputBox from '../InputBox/InputBox';
import HumanFormat from '../HumanFormat/HumanFormat';
import {isValidCron} from 'cron-validator';
import Nav from "../Nav/Nav";
import Expressions from "../Expressions/Expressions";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {

    state = {
        human: 'Enter Cron Expression Bellow'
    }

    readText = (text) => {

        console.log(this.state.human);

        this.setState({human: text})
        console.log(this.state.human);

    }

    render() {
        return (
            <div>


            <Router>

                <Nav/>
                <Switch>

                <Route path="/" exact render={(props) => <> <HumanFormat text={this.state.human}></HumanFormat> <InputBox humanFormat={this.readText} /> </>}/>
                <Route path="/expressions" exact component={Expressions} />

                </Switch>
                {/* <HumanFormat text={this.state.human}></HumanFormat>

                <InputBox humanFormat={this.readText}></InputBox> */}

                {/* <Expressions />   */}

            </Router>



            </div>
        );
    }
}

export default App;