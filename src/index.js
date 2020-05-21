import React from 'react';
import ReactDOM from 'react-dom';

function Item(props) {
return (
  <div className="item">
    <p>{props}</p>
  </div>
);
  
}

class ItemList extends React.Component {

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
      formContent: ''
    };

  this.onChange = this.onChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

  }
   onChange(event) {
      this.setState({formContent: event.target.value});
    }
    onSubmit(event) {
      alert('Submitted:' + this.state.formContent);
    }

  render() {
    return (
      <AddItem onChange={this.onChange} onSubmit={this.onSubmit} textContent={this.state.formContent}/>
    )
  }
}

ReactDOM.render(
    <List />,
  document.getElementById('root')
);


