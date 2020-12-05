import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const SkeletonVideo = () => {

    return (
        <div style={{ width: "100%", margin: '1rem 0' }} >
            <SkeletonTheme color="#343a40" highlightColor="#3c4147" >
                <Skeleton style={{ height: '180px' }} />
                <div>
                    <Skeleton width={40} height={40} circle style={{ margin: '0.5rem 0.5rem 0.5rem 0' }} />
                    <Skeleton width="75%" height={40} />
                </div>
            </SkeletonTheme>
        </div>
    )
}

export default SkeletonVideo
