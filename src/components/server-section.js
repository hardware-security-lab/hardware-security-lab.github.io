import React from 'react';
import './server-section.css';

const ServerSection = () => {
    return <section className="major">
        <h2>Servers</h2>
        <section id="server-section-images">
            <img id="gallery" src="/images/server_cluster.jpg"></img>
            <img id="gallery" src="/images/oscilloscopes.jpg"></img>
        </section>
    </section>
};

export default ServerSection;