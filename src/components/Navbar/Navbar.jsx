import React from 'react'
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem, Typography } from '@material-ui/core'
import { ShoppingCart } from '@material-ui/icons'
import { Link, useLocation } from 'react-router-dom'

import useStyles from './styles'
import logo from '../../assets/Logo4-6.png'

const Navbar = ({totalItems}) => {
    const classes = useStyles()
    const location = useLocation()

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant="h6" className={classes.title} color='inherit'>
                        <img src={logo} alt='mycommerce.js' height="25px" className={classes.image}/>
                        Mycommerce.js
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && ( /*Este operador funciona para mostrar SOLO en el caso mencionado,el bloque de codigo que queramos */
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label="Show cart items" color='inherit'>
                                <Badge badgeContent={totalItems} color="secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton> 
                        </div>
                    )}
                </Toolbar>
            </AppBar>    
        </>
    )
}

export default Navbar
