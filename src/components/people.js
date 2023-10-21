import React from 'react';
import people from "../data/people.yaml";
import defaultProfilePhoto from "../../static/images/default_profile_photo.webp";

import './people.css';

const allPeople = {
    "Faculty": [
        {dblpName: "Daniel Genkin", email: "genkin@gatech.edu", website: "https://faculty.cc.gatech.edu/~genkin", role: "Associate Professor", photo: defaultProfilePhoto},
    ],
    "Post-Doctoral Researchers": [],
    "Students": [
        {dblpName: "Stephan van Schaik", email: "stephvs@umich.edu", website: "https://synkhronix.com", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Youssef Toubah", email: "ytobah@umich.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Ingab Kang", email: "igkang@umich.edu", website: "https://scholar.google.com/citations?user=ik1D_PUAAAAJ&hl=en", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Jason Kim", email: "nosajmik@gatech.edu", website: "https://jasonkim.page", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Nureddin Kamadan", email: "kamadan@gatech.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Pradyumna Shome", email: "pradyumna.shome@gatech.edu", website: "https://pradyumnashome.com", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Hritvik Taneja", email: "htaneja3@gatech.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Walter Wang", email: "walwan@gatech.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Jalen Chuang", email: "jchuang9@gatech.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Zeezoo Ryu", email: "zeezooryu@gatech.edu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Byeongyong Go", email: "bygo@gatech.edu", website: "/", role: "MS Student", photo: defaultProfilePhoto},
        {dblpName: "Sam Lefforge", email: "plefforge3@gatech.edu", website: "/", role: "MS Student", photo: defaultProfilePhoto}
    ],
    "MS Students": [ ],
    "Undergraduates": []
};

const PeopleList = (props) => {
    const allSections = Object.keys(allPeople).map((sectionName, index) => {
        return <PeopleListSection key={index} sectionName={sectionName} people={allPeople[sectionName]}/>;
    });
    return <section className="major" id="people">
        <h2>People</h2>
        <br></br>
        <div className="columns">
            {allSections}
        </div>
    </section>;
}
export default PeopleList;

const PeopleListSection = (props) => {
    const sectionName = props.sectionName;
    const people = props.people;

    if (people.length === 0) {
        return null;
    }

    const profilePhotos = people.map((person, index) => {
        return <ProfilePhoto key={index} person={person}/>
    });

    return <section className="people-section">
            <h3>{sectionName}</h3>
            <div className="columns">
                {profilePhotos}
            </div>
        </section>;
}

const emailMangle = (email) => {
    const parts = email.split("@");
    return parts[0] + " [at] " + parts[1];
}


const ProfilePhoto = props => {
    const person = props.person;
    return <div className="person-photo-container">
        <img className="person-photo" src={defaultProfilePhoto}></img>
        <div className="person-information">
            <p className="person-name">{person.dblpName}</p>
            <p className="person-email">{emailMangle(person.email)}</p>
            <p className="person-website"><a href={person.website}>Website</a></p>
        </div>
    </div>;
}
