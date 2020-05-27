import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Item extends React.Component {
render () {
  return (
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

class ItemList extends React.Component { //TODO: add keys

  render() {
    var listContent = this.props.items.map((item, index) => <Item
     text={item} 
     key={item}
     onDelete={(i) => this.props.onRemove(index)}
     ></Item>);

    return (
      <ul id="itemList">{listContent}</ul>
    )
  }
}

class AddItem extends React.Component {
 render() {
   return (
    <form id="addItem" onSubmit={this.props.onSubmit}>
      <input id="inputBox" 
      type="text" 
      onChange={this.props.onChange}
      autoComplete="off">

      </input>
      <input id="itemSubmit" type="submit" value="Submit"></input>
    </form>
   );
 }
}

class List extends React.Component {
  //contains form content and list of items
  constructor(props) {
    super(props);
    this.state = {
      formContent: '',
      itemList: []
    };
  //binds functions
  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onDelete = this.onDelete.bind(this);

  }
  //handles text input into entry box
    onChange(event) {
      this.setState({formContent: event.target.value});
    }
    //adds items to the list
    onSubmit(event) {
      if (this.state.formContent !== '') {
        this.setState({itemList: [...this.state.itemList, this.state.formContent]})
        console.log('Submitted: ' + this.state.formContent);
        this.setState({formContent: ''});
      }
      event.preventDefault();
    }
    //removes items from the list
    onDelete(index) {
      var array = [...this.state.itemList];
      array.splice(index, 1);
      this.setState({itemList: array});
    }

  render() {
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


