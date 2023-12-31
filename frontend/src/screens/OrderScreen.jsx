import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
//import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {useGetOrderDetailsQuery} from '../slices/ordersApiSlice';

import React from 'react'

const OrderScreen = () => {
    const {id:orderId}= useParams();

    const {data:order, refetch, isLoading, error}= 
    useGetOrderDetailsQuery(orderId);
    
    console.log(order);
    
  return isLoading? <Loader/> : error ? <Message variant="danger"></Message>
  : (
    <>
        <h2>Order {order._id} </h2>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                    <h3>Shipping</h3>
                    <p>
                        <strong>Name: </strong> {order.user.name}
                    </p>
                    <p>
                        <strong>Email: </strong>{' '}
                        <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                    </p>
                    <p>
                        <strong>Address: </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{' '}
                        {order.shippingAddress.postalCode},{' '}
                        {order.shippingAddress.country}
                    </p>
                    {order.isDelivered ? (
                    <Message variant='success'>
                        Delivered on {order.deliveredAt}
                    </Message>
                    ) : (
                        <Message variant='danger'>Not Delivered</Message>
                    )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                    <h3>Payment Method</h3>
                    <p>
                        <strong>Method: </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'>Paid on {order.paidAt}</Message>
                    ) : (
                        <Message variant='danger'>Not Paid</Message>
                    )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        
                        {order.orderItems.map((item, index) => (
                            <ListGroup.Item key={index}>
                            <Row>
                                <Col md={1}>
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fluid
                                    rounded
                                />
                                </Col>
                                <Col>
                                <Link to={`/product/${item.product}`}>
                                    {item.name}
                                </Link>
                                </Col>
                                <Col md={4}>
                                {item.qty} x ${item.price} = ${item.qty * item.price}
                                </Col>
                            </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Order Summary</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Items</Col>
                            <Col>${order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Shipping</Col>
                            <Col>${order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Tax</Col>
                            <Col>${order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                            <Col>Total</Col>
                            <Col>${order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {/* Pay order placeholder */}
                        {/* mark as delivered placeholder */}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
  );
}

export default OrderScreen
