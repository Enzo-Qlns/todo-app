import React from "react"
import './Loader.css';

export default function Loader() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <span className="loader"></span>
        </div>
    )
}