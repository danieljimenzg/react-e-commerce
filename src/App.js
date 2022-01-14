import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart } from './components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setcart] = useState({})

    const fetchProducts = async () => {
        const {data} = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        setcart(await commerce.cart.retrieve())
    }

    const handleAddToCart = async (productId, quantity) => {
        const {cart} = await commerce.cart.add(productId, quantity)
        setcart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity})
        setcart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId)   
        setcart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty()
        setcart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])

    console.log(cart)

    return (
        <Router>
            <div>
                <Navbar totalItems={cart.total_items} />
                <Routes>
                    <Route path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}></Route>
                    <Route path='/cart' element={
                        <Cart
                            cart={cart} 
                            handeUpdateCartQty={handleUpdateCartQty}
                            handleEmptyCart={handleEmptyCart}
                            handleRemoveFromCart={handleRemoveFromCart}
                        />}>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App
