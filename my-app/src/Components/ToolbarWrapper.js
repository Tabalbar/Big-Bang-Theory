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
        parallaxValue,
        bookmarkList,
        goToBookmarkedStar,
        handleQuery
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
                parallaxValue={parallaxValue}
                bookmarkList={bookmarkList}
                goToBookmarkedStar={goToBookmarkedStar}
                handleQuery={handleQuery}
            />
        </>
    )
}

export default ToolbarWrapper
