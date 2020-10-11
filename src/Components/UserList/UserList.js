import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function UserList(props) {
  const [list, setList] = useState(props.data);
  const [mode, setMode] = useState('add');
  const [itemToBeAdded, setitemToBeAdded] = useState('');

  useEffect(() => {
    setList(props.data);
  }, [props.data]);

  let setViewMode = () => {
    setMode('view');
    setitemToBeAdded('');
  };
  let setAddMode = () => {
    setMode('add');
  };

  let AddItemClickHandler = () => {
    props.addItem({
      id: uuidv4(),
      msg: itemToBeAdded.trim(),
      completed: false,
    });
    setViewMode();
  };
  let deleteClickHandler = (id) => {
    props.deleteItem(id);
  };
  let itemEditClickHandler = (val) => {
    let response = prompt('Enter the new value', val.msg);
    if (response) {
      props.editItem({ msg: response, id: val.id });
    }
  };
  let bannerEditClickHandler = (val) => {
    console.log(val);
    let response = prompt('Enter the new category value', val);
    if (response) {
      props.editCategoryTitle(response);
    }
  };

  let ControlComponent = () => {
    if (mode === 'view') {
      return (
        <div style={styles.ControlsInViewMode}>
          <span onClick={setAddMode} style={{ cursor: 'pointer' }}>
            + Add new Category
          </span>
        </div>
      );
    } else {
      return (
        <div style={styles.AddContainer}>
          <input
            placeholder="Enter new item"
            type="text"
            onChange={(e) => {
              setitemToBeAdded(e.target.value);
            }}
          />
          <div style={styles.ControlsInAddMode}>
            <button
              style={styles.AddButton}
              onClick={AddItemClickHandler}
              disabled={itemToBeAdded.trim() === ''}
            >
              Add Card
            </button>
            <div style={{ cursor: 'pointer' }} onClick={setViewMode}>
              X
            </div>
          </div>
        </div>
      );
    }
  };
  let ListComponent = () => {
    return list['todos'].map((item) => {
      return (
        <div style={styles.noteItem} key={item.id}>
          <span style={{ color: item.completed ? 'green' : 'black' }}>
            {item.msg}
          </span>
          <span style={styles.spacer}></span>
          <input
            type="checkbox"
            checked={item.completed}
            style={styles.icon}
            onChange={() => props.toggleComplete(item.id)}
          />
          <span
            style={styles.icon}
            onClick={() => itemEditClickHandler(item)}
          >
            E
          </span>
          <span
            style={styles.icon}
            onClick={() => deleteClickHandler(item.id)}
          >
            X
          </span>
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <span>{props.data.name}</span>{' '}
        <span
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => bannerEditClickHandler(props.data.name)}
        >
          E
        </span>{' '}
      </div>
      {ListComponent()}
      {ControlComponent()}
    </div>
  );
}

const styles = {
  container: {
    width: '15rem',
    height: 'fit-content',
    padding: '1rem',
    margin: '1rem',
    background: '#ddd',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '5px',
    boxShadow: '2px 2px 5px grey',
  },
  banner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    alignItems: 'center',
    height: '2rem',
  },
  noteItem: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: '5px 0',
    padding: '0.5rem',
    boxShadow: '2px 0 5px grey',
    borderRadius: '3px',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'white',
  },
  ControlsInViewMode: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '1rem',
    alignItems: 'center',
  },
  ControlsInAddMode: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  AddButton: {
    color: 'white',
    padding: '10px 20px',
    background: 'green',
    cursor: 'pointer',
  },
  AddContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
  },
  spacer: {
    flex: '1',
  },
  icon: {
    color: 'red',
    cursor: 'pointer',
    margin: '0 5px',
  },
};

export default UserList;
