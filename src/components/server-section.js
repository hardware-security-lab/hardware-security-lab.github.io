import React from 'react';
import './server-section.css';

const ServerSection = () => {
    return <section className="major">
        <h2>Servers</h2>
        <section id="server-section-images">
            <img className="gallery" src="/images/server_cluster.webp"></img>
            <img className="gallery" src="/images/oscilloscopes.webp"></img>
        </section>
    </section>
};

export default ServerSection;