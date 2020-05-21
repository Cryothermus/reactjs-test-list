import React from 'react';
import ReactDOM from 'react-dom';

class Item extends React.Component {
  
}

class ItemList extends React.Component {

}

class AddItem extends React.Component {
 render() {
   return (
    <div>
      <input className="inputBox" type="text"></input>
      <input type="submit"></input>
    </div>
   );
 }
}

class List extends React.Component {
  render() {
    return (
      <AddItem />
    )
  }
}

ReactDOM.render(
    <List />,
  document.getElementById('root')
);


