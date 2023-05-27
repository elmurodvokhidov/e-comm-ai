import { useEffect, useState } from "react";
import React from 'react';
import { GrCart } from "react-icons/gr";

function Cart(props) {
    const [main, setMain] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => setMain(json))
    }, []);

    console.log(main);

    return (
        <div className="album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {main.map((item) => (
                        <div className="col">
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
                                    <span className="text-muted">{item.price}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="fixed-top m-3">
                <button type="button" class="btn btn-primary position-relative">
                    <span><GrCart /></span>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span class="visually-hidden">unread messages</span>
                    </span>
                </button>
            </div>
        </div>
    );
}

export default Cart;