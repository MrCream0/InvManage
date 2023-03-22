import React, { Component } from 'react';
import './Home.css';


//make table for items then add buttons and stuff for on hand in transit and add options for adding new items into the table and deleting items from the table

export class Home extends Component {
  static displayName = Home.name;

  //invObjects
  state = {
    inventory: [
      { name: "Item 1", onHand: 10, inTransit: 5 },
      { name: "Item 2", onHand: 20, inTransit: 10 },
      { name: "Item 3", onHand: 15, inTransit: 0 },
    ]
  };


  addInventoryObject = (name, onHand, inTransit) =>{//add option for adding new items into the table
    const nameInput = document.getElementById('name').value;
    const onHandInput = document.getElementById('onHand').value;
    const inTransitInput = document.getElementById('inTran').value;

    name = nameInput;
    onHand = parseInt(onHandInput);
    inTransit = parseInt(inTransitInput);

    const newInventory = [...this.state.inventory];
    newInventory.push({name, onHand, inTransit});
    this.setState({inventory: newInventory});

    document.getElementById('name').value = '';
    document.getElementById('onHand').value = '';
    document.getElementById('inTran').value = '';
  };



  updateOnHand = (index, value) => {
    const newInventory = [...this.state.inventory];
    newInventory[index].onHand = value;
    this.setState({ inventory: newInventory });
  }; // add option for udpating on hand and also showing the confirmed on hand value "to avoid messing with the on hand accidently"

  updateInTransit = (index, value) => {
    const newInventory = [...this.state.inventory];//create a new array with updated values
    newInventory[index].inTransit = value;
    this.setState({ inventory: newInventory });//update state
  };

  render() {
    return (
      <div>
        <h1>Inventory Management</h1>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>On Hand</th>
              <th>In Transit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.inventory.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number"
                    value={item.onHand}
                    onChange={(e) => this.updateOnHand(index, e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.inTransit}
                    onChange={(e) => this.updateInTransit(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <input id='name' type="text" placeholder="Item Name" />
        <input id='onHand' type="number" placeholder="On Hand" />
        <input id='inTran' type="number" placeholder="In Transit" />
        <button onClick={() => this.addInventoryObject()}>Add Item</button>
      </div>
    );
  };
};