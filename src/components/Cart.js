import { useEffect, useState } from "react";
import React from 'react';
import { GrCart } from "react-icons/gr";
import { toast } from "react-toastify";

function Cart(props) {
    const [main, setMain] = useState([]);
    const [cart, setCart] = useState([]);
    const [modal, setModal] = useState(false);

    // Add to cart handler function
    const addCartHandler = (item) => {
        setCart((prev) => {
            return [...prev, item]
        });
        toast.dark("Product added successfully!")
    };

    // Open modal function
    const modalHandler = () => {
        setModal(!modal);
    };

    // Get the product from API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => setMain(json))
    }, []);

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {main.map((item) => (
                        <div key={item.id} className="col">
                            <div className="card shadow-sm p-3" style={{ minHeight: '550px' }}>
                                <div className="card-title">
                                    <h4 className="text-muted text-center">Product #{item.id}</h4>
                                </div>
                                <img src={item.image} alt={item.title} className="bg-placeholder card-image-top" width={'100%'} height={'400px'} />
                                <div className="card-body">
                                    <p className="card-text">{item.title.slice(0, 20)}</p>
                                    <p className="card-text fw-lighter">{item.description.slice(0, 100)}</p>
                                </div>
                                <div className="card-footer d-flex justify-content-between align-items-center">
                                    <div>
                                        <span>{item.category}</span>
                                    </div>
                                    <span className="text-muted">${item.price}</span>
                                </div>
                                <button onClick={() => addCartHandler(item)} className="mt-3 btn btn-outline-primary">Add Cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-top m-3">
                <button onClick={modalHandler} type="button" className="btn btn-primary position-relative">
                    <span><GrCart /></span>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {cart.length}
                        <span className="visually-hidden">unread messages</span>
                    </span>
                </button>
            </div>
            {
                modal && (<div className="modal" style={{ display: "block", background: "rgba(0, 0, 0, .8)" }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Cart</h5>
                                <button onClick={modalHandler} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {cart.map((item, index) => (
                                    <div key={index} className="card mb-3">
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.image} alt={item.title} className="img-fluid rounded-start" />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.title}</h5>
                                                    <p className="cart-text text-muted">{item.description.slice(0, 100)}</p>
                                                    <p className="card-text">
                                                        <small className="text-muted">${item.price}</small>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button onClick={modalHandler} type="button" className="btn btn-primary">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
        </div>
    );
}

export default Cart;