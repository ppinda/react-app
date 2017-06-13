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

        var val = Array.prototype.filter.call(
            document.getElementsByTagName('input'),
            (el) => el.getAttribute('classid') == i
        );

        var output = val[0].value;
        persons[i].addAccoutDetails = output;
        console.log(persons);
        val[0].value = '';
        val.color = 'grey';
        val.disabled = true;
    },

    render: function () {
            var listOfPerson = persons.map((p, i) => {
                return (
                    <tr key={i}ref="keyRef">
                        <th>{i}</th>
                        <td>{p.firstName}</td>
                        <td>{p.lastName}</td>
                        <td><input classID={i} ref="accountInput"/></td>
                        <td><button ref="accountButton" onClick={this.addAccountDetails.bind(this,i)} >Add Account</button></td>
                    </tr>
                );
            });
            return (
                <div className="row">
                    <table className="table table-striped table-inverse">
                        <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
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
                    <button onClick={this.handleClick} className="btn btn-outline-success col-md-2" type={this.props.behavior}>Search</button>
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



