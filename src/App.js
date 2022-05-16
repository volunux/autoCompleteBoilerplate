import React from 'react';
import axios from 'axios';

const App = () => {
  return (
    <div className="App">
      <UsernameAutoComplete />
    </div>
  );
}

class UsernameAutoComplete extends React.Component {
  myUsername = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      'username': '',
      'usernames': [],
    };
    this.seeUsername = this.seeUsername.bind(this);
    this.selectedUsername = this.selectedUsername.bind(this);
    this.clearUsernameList = this.clearUsernameList.bind(this);
  }

  clearUsernameList() {
    this.setState({usernames: []});
  }

  async seeUsername(e) {
    let username = e.target.value;
    if (!username) return this.clearUsernameList();
    const { data } = await axios.get("https://jsonplaceholder.typicode.com/users", { 'Content-Type':'application/json'});
       
     try {
       if (data && Array.isArray(data) && data.length > 0) {

        let userRegExp = new RegExp('^' + username, 'i');
        let usernames = data.map((item) => { return item.username; });
        usernames = usernames.filter((name) => { if (name.match(userRegExp)) return name; });
        this.setState({'usernames': usernames, 'username': username});
       }
     }
     catch (err) {
       console.log('Error occured');
       this.clearUsernameList();
     }
  }

  selectedUsername(username) {
    this.myUsername.current.value = username;
    this.clearUsernameList();
  }

  render() {
    return (
    <form autoComplete="username">
      <div className="autocomplete usernameSearch">
      <input id="myInput" type="text" name="username" placeholder="Type something..........." onChange ={this.seeUsername} ref={this.myUsername}/>
      <button type="submit" onClick={(e) => e.preventDefault()}>Search</button>
        </div>
      <UsernameList usernames ={this.state.usernames} itemClick={this.selectedUsername} choosenUsername={this.state.username}/>
      </form>
    )
  }
}

class UsernameList extends React.Component {

  constructor(props) {
    super(props);
    this.publishUsername = this.publishUsername.bind(this);
  }

  publishUsername(e) {
    let username = e.target.textContent;
    if (e.target.tagName === 'LI') this.props.itemClick(username);
  }

  render() {
    const usernames = this.props.usernames;

    if (usernames.length < 1) return null;
    const usernameListItems = usernames.map((username, idx) => {
      return <UsernameItem username={username} key ={idx} nameStr={this.props.choosenUsername}/>
    });

    return (<div id="suggestions">
            <ul onClick={this.publishUsername}>{usernameListItems}</ul>
            </div>)

  }
}

class UsernameItem extends React.Component {

  render() {
    let strLength = this.props.nameStr.length;
    let str = (<b>{this.props.username.substring(0, strLength)}</b>);
    return (<li>{str}{this.props.username.substring(strLength)}</li>)
  } 
}

export default App;
