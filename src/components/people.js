import React from 'react';
import people from "../data/people.yaml";
import defaultProfilePhoto from "../../static/images/default_profile_photo.webp";

import './people.css';

const PeopleList = (props) => {
    const allSections = Object.keys(people).map((sectionName, index) => {
        return <PeopleListSection key={index} sectionName={sectionName} people={people[sectionName]}/>;
    });
    return <section className="major" id="people">
        <h2>People</h2>
        <br></br>
        <div className="people-category-section-list">
            {allSections}
            <section className="minor people-category">
                <h3>Join Us</h3>
                <p>
                    We are looking for excellent students interested in working with us.
                    If that is you, drop us a line at <a href="mailto://genkin@gatech.edu">genkin@gatech.edu</a>.
                </p>
            </section>
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

    return <section className="people-category">
            <h3>{sectionName}</h3>
            <div className="people-category-list">
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
    const website = person.website !== undefined && person.website !== "" ? person.website : "/";
    let photoPath = defaultProfilePhoto;
    let personName = "";
    if (person.displayName !== undefined && person.displayName !== "") {
        let personDisplayName = person.displayName.toLowerCase();
        photoPath = "/images/people/" + personDisplayName.replaceAll(" ", "-") + ".webp";
        personName = person.displayName;
    } else if (person.dblpName !== undefined && person.dblpName !== "") {
        let personDblpName = person.dblpName.toLowerCase();
        photoPath = "/images/people/" + personDblpName.replaceAll(" ", "-") + ".webp";
        personName = person.dblpName;
    }

    const firstPositionTitleAfterGraduatingOrNull = person.firstPositionTitleAfterGraduating !== undefined 
        ? <div className="person-first-position-title-after-graduating">{person.firstPositionTitleAfterGraduating}</div> 
        : null;
    const firstPositionInstitutionAfterGraduatingOrNull = person.firstPositionInstitutionAfterGraduating !== undefined
        ? <div className="person-first-position-institution-after-graduating">{person.firstPositionInstitutionAfterGraduating}</div>
        : null;
    
    return <div className="person-container">
        <div className="person-photo-container">
            <img className="person-photo" src={photoPath}></img>
        </div>
        <div className="person-information">
            <p className="person-name">{personName}</p>
            <p className="person-email">{emailMangle(person.email)}</p>
            <p className="person-website"><a href={website}>Website</a></p>
            { firstPositionTitleAfterGraduatingOrNull }
            { firstPositionInstitutionAfterGraduatingOrNull }
        </div>
    </div>;
}
