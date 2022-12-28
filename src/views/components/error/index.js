import React from "react"
import { Card, CardHeader, CardBody, CardTitle, Collapse } from 'reactstrap'

const ErrorLoadingRemote = () => {
    return (
        <Card className='card-snippet'>
            <CardBody className="text-center">
                <div>Remote container is unavailable.</div>
            </CardBody>
        </Card>
    )
}

export default ErrorLoadingRemote
