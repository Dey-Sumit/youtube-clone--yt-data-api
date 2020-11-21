import React from 'react'
import { Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const ChannelScreen = () => {
    const { channelId } = useParams()

    return (
        <Container>
            {
                channelId
            }
        </Container>
    )
}

export default ChannelScreen
