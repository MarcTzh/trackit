import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import {Button} from "reactstrap";


export default function Cards() {
    return (
        <Card style={{width: '20rem'}}>
            <CardImg top src="img-src" alt="..."/>
            <CardBody>
                <CardTitle>Card title</CardTitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button color="secondary">Go somewhere</Button>
            </CardBody>
        </Card>
    );
}