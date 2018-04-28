import React, {Component } from 'react' ;

function ListContacts(props) {
    return(
        <ol className='contact-list'>
            { props.contacts.map((contact) => (
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
                        onClick={() => props.onDeleteContact(contact)}
                        className='contact-remove'>
                        Remove
                    </button>
                </li>
            ))}
        </ol>
    )
}

export default ListContacts