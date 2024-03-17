import React from 'react'

export function BtnLoadingIndicator() {

    return (
        <div className="flex items-center justify-center h-full w-full">
            <div className="flex animate-spin text-secondaryColor">
                <i className="fa fa-spinner" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export function PageLoadingIndicator() {

    return (
        <div className="flex items-center justify-center h-[100vh] w-[100vw]">
            <div className="flex animate-spin text-secondaryColor">
                {/* <i className="fa fa-circle-o-notch fa-3x"></i> */}
                <i className="fa fa-spinner fa-3x" aria-hidden="true"></i>
            </div>
        </div>
    )
}

export function SectionLoadingIndicator() {

    return (
        <div className="flex items-center justify-center flex-grow">
            <div className="flex animate-spin text-secondaryColor">
                <i className="fa fa-spinner fa-2x" aria-hidden="true"></i>
            </div>
        </div>
    )
}
