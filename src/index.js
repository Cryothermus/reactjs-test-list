import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Item extends React.Component {
//class for individual items on the list
render () {
  return (
    //contains the item as a whole, its text, and its delete button
    <div className="item">
        <p 
        className="itemText"
        >
        {this.props.text}
        </p>
        <input 
        className="delButton" 
        type="button" 
        value="X" 
        onClick={this.props.onDelete}></input>
    </div>
  );
}
}

class ItemList extends React.Component {
//for the list of items, containing each individual item
  render() {
    //creates each item component from the main array
    var listContent = this.props.items.map((item, index) => <Item
     text={item} 
     key={item}
     onDelete={(i) => this.props.onRemove(index)}
     ></Item>);
    //renders the resulting components in a list
    return (
      <ul id="itemList">{listContent}</ul>
    )
  }
}

class AddItem extends React.Component {
//handles the form to add to the list- text box + submit button
 render() {
   return (
    <form id="addItem" onSubmit={this.props.onSubmit}>
      <input id="inputBox" 
      type="text" 
      value={this.props.textContent}
      onChange={this.props.onChange}
      autoComplete="off">
      </input>
      <input id="itemSubmit" type="submit" value="Submit"></input>
    </form>
   );
 }
}

class Notice extends React.Component {
  render() {
    if (this.props.noticeText !== '') {
    return (
      <div className="notice">
        <p id="noticeText">
          {this.props.noticeText}
        </p>
      </div>
    );
    }
    else return null; 
  }
}

class List extends React.Component {
  //the app as a whole- a list of strings that can be added to and removed

  //constructor contains form content and list of items
  constructor(props) {
    super(props);
    //state of the app
    this.state = {
      formContent: '',
      itemList: [],
      notice: ''
    };

  //binds functions
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onDelete = this.onDelete.bind(this);
  //this.showNotice = this.showNotice.bind(this); //this is apparently not necessary

  }
  //handles manipulation of the input text box
    onChange(event) {
      this.setState({formContent: event.target.value});
    }

    //adds items to the list upon submission
    onSubmit(event) {
      if (this.state.itemList.length >= 8) { //if there are too many items in the list
        this.showNotice("Maximum of 8 items.", 2);
      }
      else if (this.state.formContent.length >= 170) { //if the added item is too long
        this.showNotice("170 characters max", 2);
      }
      else if (this.state.itemList.indexOf(this.state.formContent) !== -1) {
        this.showNotice("Item already exists", 2);
      }
      else if (this.state.formContent !== '') {
        this.setState({itemList: [...this.state.itemList, this.state.formContent]})
        console.log('Submitted: ' + this.state.formContent);
      }
      this.setState({formContent: ''}); //clears the text box upon submission
      event.preventDefault();
    }

    //removes items from the list upon clicking the appropriate X button
    onDelete(index) {
      var array = [...this.state.itemList];
      array.splice(index, 1);
      this.setState({itemList: array});
      console.log('Removed item:' + index)
    }

    //shows a notice (text) for the given number of seconds
    showNotice(text, seconds) {
      this.setState({notice: text});
      setTimeout(() => {this.setState({notice: ''})}, seconds * 1000);
    }
  
  render() {
    //the rendering function proper- renders the input form and the list
    return (
      <div id="list">
        <div>
        <AddItem 
        onChange={this.onChange} 
        onSubmit={this.onSubmit} 
        textContent={this.state.formContent}
      ></AddItem>
        </div>
        <div>
          <Notice noticeText={this.state.notice}></Notice>
        </div>
        <div>
          <ItemList items={this.state.itemList} onRemove={(index) => this.onDelete(index)}></ItemList>
        </div>
      </div>

    )
  }
}

ReactDOM.render(
    <List/>,
  document.getElementById('root')
);


