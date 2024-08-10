import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './styles.css';
import axios from 'axios';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

const CreditCardPage = () => {
    const [creditCards, setCreditCards] = useState([]);
    const [banks, setBanks] = useState([
        'Bank of America',
        'Chase Bank',
        'Wells Fargo',
        'Citibank',
        'HSBC'
    ]);
    const [newCard, setNewCard] = useState({ id: '', bankName: '', creditCardName: '', enabled: false, createdAt: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [validationErrors, setValidationErrors] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getCreditCards();
    }, [currentPage, searchQuery]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCard({ ...newCard, [name]: type === 'checkbox' ? checked : value });
    };

    const handleOpenModal = (card = null) => {
        if (card) {
            setIsEditing(true);
            setNewCard({
                id: card.id,
                bankName: card.bankName || '',
                creditCardName: card.creditCardName || '',
                enabled: card.enabled || false,
                createdAt: card.createdAt || ''
            });
        } else {
            setIsEditing(false);
            setNewCard({ bankName: '', creditCardName: '', enabled: false, createdAt: '' });
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setValidationErrors({});
    };

    const getCreditCards = async () => {
        try {
            const getAllCardsResp = await axios.get('http://localhost:5000/api/creditCard/getAll', {
                params: {
                    page: currentPage,
                    limit: 10,
                    search: searchQuery
                }
            });
            if (getAllCardsResp.data.data) {
                setCreditCards(getAllCardsResp.data.data);
                setTotalPages(getAllCardsResp.data.totalPages);
            }
        } catch (error) {
            console.error("There was an error fetching the credit cards!", error);
        }
    };

    const validateCard = () => {
        const errors = {};
        if (!newCard.bankName) errors.bankName = "Bank Name is required.";
        if (!newCard.creditCardName) errors.creditCardName = "Credit Card Name is required.";
        return errors;
    };

    const handleSaveCard = async () => {
        const errors = validateCard();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            if (isEditing) {
                await axios.put(`http://localhost:5000/api/creditCard/update/${newCard.id}`, {
                    bankName: newCard.bankName,
                    creditCardName: newCard.creditCardName,
                    enabled: newCard.enabled
                });
                toast.success("Credit card updated successfully!");
            } else {
                await axios.post('http://localhost:5000/api/creditCard/add', {
                    bankName: newCard.bankName,
                    creditCardName: newCard.creditCardName,
                    enabled: newCard.enabled,
                    createdAt: new Date().toISOString()
                });
                toast.success("Credit card added successfully!");
            }
            await getCreditCards(); // Refresh the credit cards list
            handleCloseModal();
        } catch (error) {
            console.error("There was an error saving the credit card!", error);
        }
    };

    const handleDeleteCard = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/creditCard/delete/${id}`);
            toast.success("Credit card deleted successfully!");
            await getCreditCards();
        } catch (error) {
            console.error("There was an error deleting the credit card!", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const filteredCards = creditCards.filter(card =>
        card.creditCardName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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

            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
                <button
                    onClick={() => handleOpenModal()}
                    style={{
                        backgroundColor: "#007BFF",
                        color: "white",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007BFF"}
                >
                    Add New Credit Card
                </button>
            </div>

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
                                <td>{index + 1}</td>
                                <td>{card.bankName}</td>
                                <td>{card.creditCardName}</td>
                                <td>{card.enabled ? 'Yes' : 'No'}</td>
                                <td>{formatDate(card.createdAt)}</td>
                                <td>
                                    <button onClick={() => handleOpenModal(card)}>Edit</button>
                                    <button onClick={() => handleDeleteCard(card.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i}
                        onClick={() => handlePageChange(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Credit Card Modal"
                className="modal"
                overlayClassName="modal-overlay"
            >
                <h2>{isEditing ? 'Edit Credit Card' : 'Add New Credit Card'}</h2>
                <form>
                    <label>
                        Bank Name:
                        <select name="bankName" value={newCard.bankName} onChange={handleInputChange}>
                            <option value="">Select Bank</option>
                            {banks.map((bank, index) => (
                                <option key={index} value={bank}>{bank}</option>
                            ))}
                        </select>
                        {validationErrors.bankName && <span className="error">{validationErrors.bankName}</span>}
                    </label>
                    <label>
                        Credit Card Name:
                        <input
                            type="text"
                            name="creditCardName"
                            value={newCard.creditCardName}
                            onChange={handleInputChange}
                        />
                        {validationErrors.creditCardName && <span className="error">{validationErrors.creditCardName}</span>}
                    </label>
                    <label>
                        Enabled:
                        <input
                            type="checkbox"
                            name="enabled"
                            checked={newCard.enabled}
                            onChange={handleInputChange}
                        />
                    </label>
                    <div className="modal-buttons">
                        <button type="button" onClick={handleSaveCard}>
                            {isEditing ? 'Update' : 'Add'}
                        </button>
                        <button type="button" onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default CreditCardPage;
