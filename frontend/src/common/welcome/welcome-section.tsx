import React from "react";
import "./welcome-section.css"


type propType = {
    title?: string,
    desc1?: string,
    desc2?: string,
    desc3?: string,
}

const WelcomeSection = (props: propType) => {
    return <React.Fragment>
        <section className="welcome-section">
            <div className="home-container">
                <div className="welcome-section__wrapper">
                    <p className="welcome-section__title text-center">{props.title}</p>
                    {props.desc1 && <p className="welcome-section__desc">{props.desc1} </p>}
                    {props.desc2 && <p className="welcome-section__desc">{props.desc2}</p>}
                    {props.desc3 && <p className="welcome-section__desc">{props.desc3} </p>}
                </div>
            </div>
        </section>
    </React.Fragment>
}

export default WelcomeSection;