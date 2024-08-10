// CreditCardPage.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styles.css';

Modal.setAppElement('#root');

const CreditCardPage = () => {
    const [creditCards, setCreditCards] = useState([]);
    const [banks, setBanks] = useState([]);
    const [newCard, setNewCard] = useState({ bankName: '', cardName: '', enabled: false, createdAt: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Fetch credit cards and banks from the backend (API calls)
        // Example: setCreditCards(response.data);
        // Example: setBanks(response.data);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCard({ ...newCard, [name]: value });
    };

    const handleOpenModal = (card = null) => {
        if (card) {
            setIsEditing(true);
            setNewCard(card);
        } else {
            setIsEditing(false);
            setNewCard({  bankName: '', cardName: '', enabled: false, createdAt: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveCard = () => {
        if (isEditing) {
            // Logic to update the card (API call)
        } else {
            // Logic to add a new card (API call)
        }
        setIsModalOpen(false);
    };

    const handleDeleteCard = (id) => {
        // Logic to delete a card by id (API call)
        // Update the state after deleting
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCards = creditCards.filter(card =>
        card.cardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.bankName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="credit-card-page">
            <h1>Credit Card Management</h1>

            <div className="search-filter">
                <input
                    type="text"
                    placeholder="Search by card name or bank name"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            <button onClick={() => handleOpenModal()}>Add New Credit Card</button>

            <div className="card-table">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Bank Name</th>
                            <th>Credit Card Name</th>
                            <th>Enabled</th>
                            <th>Created At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCards.map((card, index) => (
                            <tr key={index}>
                                <td>{card.id}</td>
                                <td>{card.bankName}</td>
                                <td>{card.cardName}</td>
                                <td>{card.enabled ? 'Yes' : 'No'}</td>
                                <td>{card.createdAt}</td>
                                <td>
                                    <button onClick={() => handleOpenModal(card)}>Edit</button>
                                    <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Credit Card Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>{isEditing ? 'Edit Credit Card' : 'Add New Credit Card'}</h2>
                <form className="modal-form">
                    {/* <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        value={newCard.id}
                        onChange={handleInputChange}
                    /> */}
                    <select name="bankName" value={newCard.bankName} onChange={handleInputChange}>
                        <option value="">Select Bank</option>
                        {banks.map((bank, index) => (
                            <option key={index} value={bank}>{bank}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        name="cardName"
                        placeholder="Credit Card Name"
                        value={newCard.cardName}
                        onChange={handleInputChange}
                    />
                    <label>
                        Enabled:
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={newCard.enabled}
                            onChange={(e) => setNewCard({ ...newCard, enabled: e.target.checked })}
                        />
                    </label>
                    <button type="button" onClick={handleSaveCard}>{isEditing ? 'Save Changes' : 'Add Credit Card'}</button>
                </form>
            </Modal>
        </div>
    );
};

export default CreditCardPage;
