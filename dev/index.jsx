import React from "react";
import ReactDOM from "react-dom";

var persons = [];


var AddPerson = React.createClass({
    getInitialState: function () {
        return { input: '' };
    },

    handleChange: function(e) {
        this.setState({ input: e.target.value });

    },

    handleClickAdd: function() {
        var name = {};
        name.firstName = this.refs.firstName.value.toString();
        name.lastName = this.refs.lastName.value.toString();
        persons.push(name);
        this.refs.firstName.value = "";
        this.refs.lastName.value = "";
        console.log(persons);
    },


    render: function() {
        return (
            <div className="row">
                <input className="form-control col-md-4"  ref="firstName" placeholder="First name"/>
                <input className="form-control col-md-4"  ref="lastName" placeholder="Last name"/>
                <button onClick={this.handleClickAdd} className="btn btn-outline-success col-md-2" type={this.props.behavior}> {this.props.children}!</button>
            </div>
        );
    }
});

var ShowPeople = React.createClass({

    addAccountDetails : function (i) {
        // Get input value from DOM

        function getFieldValue(element) {
            var val = Array.prototype.filter.call(
                document.getElementsByTagName(element),
                (el) => el.getAttribute('classid') == i
            );
            return val;
        }
        // Get the values from input field
        var output = getFieldValue('input')[0].value;

        // Check if there is an accountDetails property
        if(!persons[i].hasOwnProperty('accoutDetails') && output.length !== 0){
            persons[i].accoutDetails = output;
            getFieldValue('input')[0].style.display = 'none';
            console.log(persons);
            //getFieldValue('td')[0].className = 'check-tick';
            getFieldValue('td')[0].innerHTML ='<span class="check-tick">'+ persons[i].firstName+ '</span>';

        }
        else {
            alert('There is no value man!');
            }
    },

    render: function () {
            var listOfPerson = persons.map((p, i) => {
                return (
                    <tr key={i}ref="keyRef" className="result-search">
                        <th>{i}</th>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td className="tick-account" classID={i}><input classID={i} ref="accountInput"/></td>
                        <td><button classID={i}  ref="accountButton" onClick={this.addAccountDetails.bind(this,i)} >Add Account</button></td>
                    </tr>
                );
            });
            return (
                <div id="sectionTable" className="row">
                    <table className=" table table-striped table-inverse ">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Account</th>
                        </tr>
                        </thead>
                        <tbody>
                        {listOfPerson}
                        </tbody>
                    </table>
                </div>
            );
    }
});

class DisplayPeople extends React.Component{

    constructor(){
        super();
        this.state = {
            clicked: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            clicked: true
        });

    }

    render() {
        return (
            <div>
                <div className="row">
                    <button id="searchButton" onClick={this.handleClick} className="btn btn-outline-success col-md-2" type={this.props.behavior}>Search</button>
                </div>
                {this.state.clicked &&  persons.length!= 0 ? <ShowPeople/> :<div className="alert alert-warning">Empty</div>}
            </div>
        );
    }
};

// Render class
ReactDOM.render(
    <div className="container-fluid">
        <AddPerson behavior="submit">Add person</AddPerson>
        <DisplayPeople/>
    </div>,
    document.querySelector("#add-person-container")
);



