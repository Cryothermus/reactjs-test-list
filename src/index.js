import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
render () {
  return (
    <div>
        <p>{this.props.text}</p>
        <input type="button" value="X" onClick={this.props.onDelete}></input>
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
      <ul>{listContent}</ul>
    )
  }
}

class AddItem extends React.Component {
 render() {
   return (
    <form onSubmit={this.props.onSubmit}>
      <input className="inputBox" type="text" onChange={this.props.onChange}></input>
      <input type="submit" value="Submit"></input>
    </form>
   );
 }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formContent: '',
      itemList: []
    };

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);
  this.onDelete = this.onDelete.bind(this);

  }
   onChange(event) {
      this.setState({formContent: event.target.value});
    }

    onSubmit(event) {
      this.setState({itemList: [...this.state.itemList, this.state.formContent]})
      console.log('Submitted: ' + this.state.formContent);
      this.setState({formContent: ''});
      event.preventDefault();
    }

    onDelete(index) {
      alert("Deleted item " + index)
    }

  render() {
    return (
      <div>
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
    <List />,
  document.getElementById('root')
);


