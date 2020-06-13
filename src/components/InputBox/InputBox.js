import React, {Component} from 'react';
import cronstrue from 'cronstrue';
import {isValidCron} from 'cron-validator'

//Global Variable for CSS changes on buttons
let c = 0;

class InputBox extends Component {

    state = {
        char: [],
        mchar:"",
        mobile:false,
    }

    componentDidMount = () => {

        //If URL has a valid Cron Expression the cron function will execute on load

        if (window.location.href.match(/[_]?[*][/]?[/d]?\w*|[_]\d\w*|[,]\d\w*|[-]\d\w*/g))
         {
            
            //Regex for matching only the part that is needed from URL
            let hrefArr = window
                .location
                .href
                .match(/[_]?[*][/]?[/d]?\w*|[_]\d\w*|[,]\d\w*|[-]\d\w*/g)   
                .join("")
                .toString()
                .split('_');

            let href2 = []
            hrefArr.forEach((item, index) => href2.length < 5
                ? href2[index] = hrefArr[index + 1]
                : null);

             //Checking the scrapped Expression from URL

            if (isValidCron(href2.join(" ").toString())) {

                if (hrefArr.length === 6) {

                    this.setState({char: href2})
                    document.getElementById("value").value = href2.join(" ").toString();
                    this.props.humanFormat(cronstrue.toString(`${href2.join(" ").toString()}`))
                    c = 5;

                    for (let index = 0; index <  document.getElementsByClassName("label").length; index++) {

                        document.getElementsByClassName("label")[index].style.backgroundColor = "#4fff75";
                        
                    }
                }

            }

        }

        //Checking if user has a mobile
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
        this.setState({
            mobile:true
        })
        }
    }


    handleCopy = () => {

        var copyText = document.getElementById("value");
        /* Select the text field */
        copyText.select();
        copyText.setSelectionRange(0, 99999);/*For mobile devices*/
        /* Copy the text inside the text field */
        document.execCommand("copy");

    }

    handleChange = (e) => {
        let final = e.target.value;
        console.log(final);
        
        isValidCron(final)? this.props.humanFormat(cronstrue.toString(final)): this.props.humanFormat("Enter valid statement");

        if(isValidCron(final)) {
            let stateObj = {id: "100"};
            let link = final.trim().replace(/ /g, "_");
            window.history.replaceState(stateObj, `/`, "/#_" + link)
        }   

    }

    //The keyDown method will be used to push and pop the parts of expression as soon as certain keys are pressed

    handleKeyDown = (e) => {
        let val = e.target.value
        let temp = this.state.char; //Temporary Value used in for poping

        c >= 0? c = c: c = 0;

        //Prevent non required Characters to be used in the input field (To do - FIX THIS)
        var code = (e.which)? e.which: e.keyCode;
        if (code > 33 && (code < 48 || code > 190 || code == 32) && code == 188) {
            e.preventDefault();
        }

        // if(this.state.char.length === 5 && e.key != "Backspace"){ e.preventDefault() }

        // If SpaceBar is Pressed the ending characters just before a space is pushed in the Expression Array state
        if (e.key == " " && val.match(/\d*\d$|[*]$|[*]?[/]?[-]?\d[/]?[-]?[,]?\d*$/g) != null && this.state.char.length < 5) {
            this.setState({
                char: [
                    ...this.state.char,val.match(/\d*\d$|[*]$|[*]?[/]?[-]?\d[/]?[-]?[,]?\d*$/g).toString()
                ]
            })

            document.getElementsByClassName("label")[c].style.backgroundColor = "#4fff75";  //Logic for trigering the CSS of the buttons

            c >= 0 && c < 5? c ++: c = 5;

           //The Final expression is stored below
            
            let final = ([...this.state.char,val.match(/\d*\d$|[*]$|[*]?[/]?[-]?\d[/]?[-]?[,]?\d*$/g).toString()]).join(" ").toString();

            //Final expression is then checked and passed to the in the cronstrue method which is then passed as a prop

            // isValidCron(final)? this.props.humanFormat(cronstrue.toString(final)): this.props.humanFormat("Enter valid statement");


            
            
        }
        
        


        //When a Backspace is triggered the last item is poped out of the array and also the input field

        if (e.key == "Backspace" && (val.match(/\s$/g) || this.state.char.length == 1) && !this.state.mobile) {

            temp.pop();
            this.setState({char: temp}) //The temp variable is used for the exression state
            c > 0? c--: c = 0;
            document.getElementsByClassName("label")[c].style.color = "white";
            document.getElementsByClassName("label")[c].style.backgroundColor = "#ffa48f";
            // e.target.value = temp.join(" ").toString() + "  ";  //Input target is updated

        //    if(temp.length !=5 ){
        //     this.props.humanFormat("Enter valid statement");
        //    }

        }

        //For mobile 

        if((e.keyCode == 229 || e.keyCode == 8) && this.state.mobile){
            this.setState({
                mchar:e.target.value
            })

            let mfinal = e.target.value;
            isValidCron(mfinal)? this.props.humanFormat(cronstrue.toString(mfinal)): this.props.humanFormat("Enter valid statement");


        }

        //The switch Case is used to disable the arrow keys 

        switch (e.which) {
            case 37:
                e.preventDefault();
                break;

            case 38:
                e.preventDefault();
                break;

            case 39:
                e.preventDefault();
                break;

            case 40:
                e.preventDefault();
                break;
        }

    }

    handleClick = () => {
       
        // var inp = document.getElementById('value');
        // inp.focus(); //sets focus to element
        // var val = inp.value; //store the value of the element
        // inp.value = ''; //clear the value of the element
        // inp.value = val; //set that value back.

    }

    handleSelect = () => {

        // var inp = document.getElementById('value');
        // inp.addEventListener('select', function () {
        //     this.selectionStart = this.selectionEnd;
        // }, false);

    }

    handleMin = () => {
        document
            .getElementById("info-cont")
            .innerHTML = " <ul>	<li> *   any value</li> <li>,	value list separator</li><li> -	  range of values" +
                "</li> <li>/	step values</li> <li> 0-59	allowed value </li> </ul>"
    }

    handleHr = () => {
        document
            .getElementById("info-cont")
            .innerHTML = " <ul>	<li> *   any value</li> <li>,	value list separator</li><li> -	range of values" +
                "</li> <li>/	step values</li> <li> 0-23	allowed value </li> </ul>"
    }

    handleDm = () => {
        document
            .getElementById("info-cont")
            .innerHTML = " <ul>	<li>* any value</li> <li>,	value list separator</li><li> -	range of values" +
                "</li> <li>/	step values</li> <li> 1-31	allowed value </li> </ul>"
    }

    handleMon = () => {
        document
            .getElementById("info-cont")
            .innerHTML = " <ul>	<li>* any value</li> <li>,	value list separator</li><li> -	range of values" +
                "</li> <li>/	step values</li> <li> 1-12	allowed value </li> </ul>"
    }

    handleDw = () => {
        document.getElementById("info-cont").innerHTML = " <ul>	<li>* any value</li> <li>,	value list separator</li><li> -	range of values" +
                "</li> <li>/	step values</li> <li> 0-6	allowed value </li> </ul>"
    }


    render() {

        // console.log(this.state.char);
        

        // if (this.state.char.length === 5 && isValidCron(this.state.char.join(" "))) {

        //     let stateObj = {id: "100"};
        //     let link = this.state.char.join("_");
        //     window.history.replaceState(stateObj, `/`, "/#_" + link)

        // }

        return (
            <div className="main">
                <div className="input-wrapper">

                    <input
                        id="value"
                        txt={this.state.text}
                        type="text"
                        onClick={this.handleClick}
                        onFocus={this.handleSelect}
                        onKeyDown={this.handleKeyDown}
                        onChange={this.handleChange}
                        ></input>
                    <i class="fas fa-copy" onClick={this.handleCopy}></i>

                </div>

                <div className="label-main">

                    <p className="label" onClick={this.handleMin}>Minute</p>
                    <p className="label" onClick={this.handleHr}>Hour</p>
                    <p className="label" onClick={this.handleDm}>Day (Month)</p>
                    <p className="label" onClick={this.handleMon}>Month</p>
                    <p className="label" onClick={this.handleDw}>Day (Week)</p>
                    <p id="label">{this.displaylink}</p>

                </div>

                <div className="info-cont" id="info-cont">

                    <ul>
                        
                        <li>* any value</li>
                        <li>, value list separator</li>
                        <li>- range of values</li>
                        <li>/ step values</li>

                    </ul>

                </div>

            </div>
        );
    }
}

export default InputBox;