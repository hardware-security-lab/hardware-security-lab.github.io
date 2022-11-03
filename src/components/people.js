import React from 'react';
import people from "../data/people.yaml";
import defaultProfilePhoto from "../../static/images/default_profile_photo.webp";

import './people.css';

const allPeople = {
    "Faculty": [
        {dblpName: "Daniel Genkin", website: "google.com", role: "Associate Professor", photo: defaultProfilePhoto},
    ],
    "Post-Doctoral Researchers": [],
    "PhD Students": [
        {dblpName: "Stephan van Schaik", website: "https://synkhronix.com", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Andrew Kwong", website: "https://andrewkwong.org/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Youssef Toubah", website: "google.com", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Ingab Kang", website: "https://scholar.google.com/citations?user=ik1D_PUAAAAJ&hl=en", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Jason Kim", website: "https://jasonkim.page", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Jie Jeff Xu", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Nureddin Kamadan", website: "/", role: "PhD Student", photo: defaultProfilePhoto},
        {dblpName: "Pradyumna Shome", website: "pradyumnashome.com", role: "PhD Student", photo: defaultProfilePhoto}
    ],
    "MS Students": [
    {dblpName: "Hritvik Taneja", website: "/", role: "MS Student", photo: defaultProfilePhoto},
    {dblpName: "Byeongyong Go", website: "/", role: "MS Student", photo: defaultProfilePhoto},
    {dblpName: "Jakub Jackowiak", website: "/", role: "MS Student", photo: defaultProfilePhoto}],
    "Undergraduates": [
    {dblpName: "Walter Wang", website: "/", role: "Undergraduate", photo: defaultProfilePhoto}]
};

const PeopleList = (props) => {
    const allSections = Object.keys(allPeople).map((sectionName, index) => {
        return <li>
            <PeopleListSection key={index} sectionName={sectionName} people={allPeople[sectionName]}/>
        </li>
    });
    return <section className="people">
        <ul>
            {allSections}
        </ul>
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
            <h2>{sectionName}</h2>
            <ul>
                {profilePhotos}
            </ul>
        </section>;
}


const ProfilePhoto = props => {
    const person = props.person;
    return <li className="person-photo-container">
        <img className="person-photo" src={defaultProfilePhoto}></img>
        <p className="person-name"><a href={person.website}>{person.dblpName}</a></p>
    </li>;
}