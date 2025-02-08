import React from "react";
import './Weather.css';
import Card from 'react-bootstrap/Card';

const CreatingCard = ({weatherData}) => {
    <Card>
        <Card.Title>
            <Card.Header className = "header">{weatherData.name}</Card.Header>
        </Card.Title>
    </Card>
}

export default CreatingCard;