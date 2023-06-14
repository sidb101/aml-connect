import "./StoryContent.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons/faArrowRight";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons/faArrowLeft";


export const StoryContent = () => {
    return (
        <div className={"xlight-panel content-container StoryContent_container"}>
            <div className={"main-heading-text"}>Main Heading</div>
            <div className={"white-panel  StoryContent_projectPanel"}>
                <div className={"section-heading-text"}>Section Heading</div>
                <br/>
                <div className={"section-subheading-text"}> Section Subheading</div>
                <div className={"section-subheading-text green-text"}> Section Blue Subheading</div>
                <div className={"section-subheading-text grey-text"}> Section Grey Subheading</div>
                <br/>
                <div className={"regular-text"}> This is regular text.</div>
                <div className={"regular-text grey-text"}> This is regular grey text.</div>
                <div className={"regular-text light-grey-text"}> This is regular light-grey text.</div>
                <div className={"small-text light-grey-text"}> This is small light-grey text.</div>
                <div className={"xsmall-text light-grey-text"}> This is xsmall light-grey text.</div>
            </div>
            <div className={"StoryContent_buttonContainer"}>
                <button className={"btn btn-solid"}>
                    Sample Solid Button &nbsp;
                    <FontAwesomeIcon icon={faArrowRight}/>
                </button>
                <button className={"btn btn-outline"}>
                    <FontAwesomeIcon icon={faArrowLeft}/> &nbsp;
                    Sample Outline Button
                </button>
            </div>
        </div>
    )
}