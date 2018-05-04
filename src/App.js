import React, { Component } from 'react'
import ListContacts from './ListContacts';
import * as ContactsAPI from './utils/ContactsAPI'
import { Route } from 'react-router-dom';
import CreateContact from './CreateContact'

class App extends Component{
    state = {
        contacts: []
    }
    
    componentDidMount() {
        ContactsAPI.getAll()
            .then((contacts) => {
                this.setState(() =>({
                    contacts
                }))
            })
    }

    createContact = (contact) => {
        ContactsAPI.create(contact)
            .then((contact) => {
                this.setState((currentState) => ({
                    contacts: currentState.contacts.concat([contact])
                } 
                ))
            })
    }

    removeContact = (contact) => {
        this.setState((currentState) => (
            {
                contacts: currentState.contacts.filter((con)=> {
                    return con.id !== contact.id
                })
            }
        ))
        ContactsAPI.remove(contact)
    }

    render() {
        return(
            <div>
                <Route exact path="/" render={() => (<ListContacts
                    contacts={this.state.contacts}
                    onDeleteContact={this.removeContact}
                    />)} 
                />
                <Route path="/create" render={({history}) => (
                    <CreateContact
                        onCreateContact={(contact) => {
                            this.createContact(contact)
                            history.push('/')
                        }}
                    />
                )} />
 
            </div>
        )
    }
}

export default App;