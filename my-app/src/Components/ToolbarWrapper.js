import React from "react";
import Toolbar from "./Toolbar";

//todo This will hold all the functionality of the toolbar, see example below
function ToolbarWrapper(
    {
        handleHomeButton,
        focusDescription,
        updateStarPosition,
        handleToggleLines,
        cameraPosition,
        handleSetParallax,
        parallaxLimit,
        bookmarkList,
        goToBookmarkedStar
    }
){



    return (
        <>
            <Toolbar
                handleHomeButton={handleHomeButton}
                focusDescription={focusDescription}
                updateStarPosition={updateStarPosition}
                handleToggleLines={handleToggleLines}
                cameraPosition={cameraPosition}
                parallaxLimit={parallaxLimit}
                handleSetParallax={handleSetParallax}
                bookmarkList={bookmarkList}
                goToBookmarkedStar={goToBookmarkedStar}
            />
        </>
    )
}

export default ToolbarWrapper
