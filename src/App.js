import React, { Component } from 'react';
import UserList from './Components/UserList/UserList';
import { v4 as uuidv4 } from 'uuid';

import './Global.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }
  addCategoryClickHandler = () => {
    let response = prompt('Enter new Category name', 'Category name');

    if (response) {
      let categories = [...this.state.categories];
      categories.push({
        name: response.trim(),
        id: uuidv4(),
        todos: [],
      });
      this.setState({ categories });
    }
  };

  addItemHandler = ({ newItem, catID }) => {
    console.log(newItem);
    let categories = [...this.state.categories];
    categories = categories.map((cat) => {
      if (cat.id === catID) {
        cat['todos'].push(newItem);
      }
      return cat;
    });
    this.setState({ categories });
  };
  deleteItemHandler = ({ deleteID, catID }) => {
    let categories = [...this.state.categories];
    categories = categories.map((cat) => {
      if (cat.id === catID) {
        cat['todos'] = cat['todos'].filter(
          (item) => item.id !== deleteID,
        );
      }
      return cat;
    });
    this.setState({ categories });
  };
  editItemHandler = ({ newItem, catID }) => {
    let categories = [...this.state.categories];

    categories = categories.map((cat) => {
      if (cat.id === catID) {
        cat['todos'] = cat['todos'].map((item) => {
          if (item.id === newItem.id) {
            console.log(item.id + '...' + newItem.id);
            return newItem;
          }
          return item;
        });
      }
      return cat;
    });
    this.setState({ categories });
  };
  editCategoryTitleHandler = ({ newVal, catID }) => {
    console.log(newVal);
    let categories = [...this.state.categories];
    categories = categories.map((cat) => {
      if (cat.id === catID) {
        cat['name'] = newVal;
      }
      return cat;
    });

    this.setState({ categories });
  };
  toggleCompleteHandler = (itemID) => {
    let categories = [...this.state.categories];
    categories = categories.map((cat) => {
      cat['todos'] = cat['todos'].map((item) => {
        if (item.id === itemID) {
          item['completed'] = !item['completed'];
        }
        return item;
      });
      return cat;
    });

    this.setState({ categories });
  };

  render() {
    return (
      <div style={styles.container}>
        {this.state.categories.map((cat, i) => (
          <UserList
            key={i}
            data={cat}
            addItem={(newItem) =>
              this.addItemHandler({ newItem, catID: cat.id })
            }
            editItem={(newItem) =>
              this.editItemHandler({ newItem, catID: cat.id })
            }
            deleteItem={(deleteID) =>
              this.deleteItemHandler({ deleteID, catID: cat.id })
            }
            editCategoryTitle={(newVal) =>
              this.editCategoryTitleHandler({ newVal, catID: cat.id })
            }
            toggleComplete={this.toggleCompleteHandler}
          />
        ))}
        <button
          style={styles.addButton}
          onClick={this.addCategoryClickHandler}
        >
          Add Category
        </button>
        <button
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          onClick={() => console.log(this.state.categories)}
        >
          Log current state
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: 'flex',
    padding: '1rem',
    background: 'whitesmoke',
    height: '100vh',
    width: '100vw',
  },
  addButton: {
    margin: '1rem',
    border: 'none',
    width: '10rem',
    height: '2rem',
    cursor: 'pointer',
    background: '#ccc',
  },
};

export default App;
