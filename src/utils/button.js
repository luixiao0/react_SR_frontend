import React from 'react'
import { Link } from 'react-router-dom'
function Button(item, index) {
    return(
        <li key={index} className={item.cName}>
        <Link to={item.path}>
            {item.icon}
        <span>{item.title}</span>
        </Link>
        </li>
    )
}
export default Button
