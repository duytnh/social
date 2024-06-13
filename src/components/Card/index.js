import React from 'react'
import './style.scss'

function Card({ backgroundItem, backgroundBall1, backgroundBall2, btn1, btn2, number, title }) {
    return (
        <div className='card-item' style={{ backgroundColor: backgroundItem }}>
            <div className='card-ball-1' style={{ backgroundColor: backgroundBall1 }}></div>
            <div className='card-ball-2' style={{ backgroundColor: backgroundBall2 }}></div>
            <div className='btn-card'>
                <button>{btn1}</button>
                <button>{btn2}</button>
            </div>
            <p className='num'>{number}</p>
            <p className='title'>{title}</p>
        </div>
    )
}

export default Card
