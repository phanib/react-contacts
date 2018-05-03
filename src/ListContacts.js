import React, {Component} from 'react' ;
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class ListContacts extends Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState(() => (
            {
                query: query.trim()
            }
        ))
    }

    render() {
        const { query } = this.state
        const {contacts, onDeleteContact} = this.props

        const showingContacts = query === ''
            ? contacts
            : contacts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
        
        return(
            <div className='list-contacts'>
                <div className='list-contacts-top'>
                    <input
                        className='search-contacts'
                        type='text'
                        placeholder='Search Contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                    <Link className='add-contact' to='/create'> Add Contact</Link>
                </div>
                {showingContacts.length !== contacts.length && (
                    <div className='showing-contacts'>
                       <span>Now showing {showingContacts.length} of {contacts.length} </span>
                       <button onClick={() => this.updateQuery('')}>
                           Clear
                       </button>
                    </div>
                ) }
                <ol className='contact-list'>
                    { showingContacts.map((contact) => (
                        <li className='contact-list-item'>
                            <div
                                className='contact-avatar'
                                style={{
                                    backgroundImage: `url(${contact.avatarURL})`
                                }}
                            ></div>
                            <div className='contact-details'>
                                <p> {contact.name} </p>
                                <p> {contact.handle} </p>
                            </div>
                            <button
                                onClick={() => onDeleteContact(contact)}
                                className='contact-remove'>
                                Remove
                            </button>
                        </li>
                    ))}
                </ol>
            </div>
        )
    }
}


export default ListContacts