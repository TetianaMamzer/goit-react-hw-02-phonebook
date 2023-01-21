import React, { Component } from 'react';
import '../index.css';
import { nanoid } from 'nanoid';

import Conteiner from './phoneBook/Conteiner';
import Form from './phoneBook/Form';
import PhoneBookList from './phoneBook/PhoneBookList';
import Filter from './phoneBook/Filter';

import Notiflix from 'notiflix';


Notiflix.Notify.init({
  width: '320px',
  position: 'center-top',
  distance: '10px',
  opacity: '1',
  fontFamily: 'source-code-pro',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  timeout: 4000,
  cssAnimationStyle: 'from-top',
  useIcon: false,
  cssAnimationDuration: 1000,

failure: {
    background: 'transperent',
    textColor: '#FF001B',
    childClassName: 'notiflix-notify-failure',
    fontAwesomeClassName: 'fas fa-times-circle',
    fontAwesomeIconColor: 'rgba(0,0,0,0.2)',
  // ...
}});

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmit = ({ name, number }) => {
    const phoneList = {
      id: nanoid(),
      name,
      number,
    };
    
    for (let i = 0; i < this.state.contacts.length; i ++) {
      const nameContact = this.state.contacts;
      if (nameContact[i].name === name) {
        return Notiflix.Notify.failure(`${name} is olredy in contacts`);
      }
    }
    
    this.setState(prevState => ({
      contacts: [phoneList, ...prevState.contacts],
    })) 
  };

  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  deleteList = idx => {
    this.setState(prevState=> ({
      contacts: prevState.contacts.filter(contact => contact.id !== idx )
    }))
  }
  
  
  render() {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const visiblePhoneList = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
    
    return (
      <Conteiner title={'Phonebook'}>
        <Form onSubmit={this.formSubmit} />
        {contacts.length > 0 && (
          <>
            <Filter value={filter} onChange={this.changeFilter}/>
            <PhoneBookList
              contacts={visiblePhoneList}
              type={'button'}
              text={'delete'}
              onClick={this.deleteList}
            />
          </>
        )}
      </Conteiner>
    );
  }
}

export default App;
