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
        handleSetDistanceValues,
        distanceValues,
        bookmarkList,
        goToBookmarkedStar,
        handleSetFilterValues,
        filterValues,
        handleSetVelMagValues,
        velMagValues,
        toggleVel,
        handleToggleVel,
        cameraMoving,
        setCameraMoving,
        cameraMovingToHome,
        setCameraMovingToHome,
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
                distanceValues={distanceValues}
                handleSetDistanceValues={handleSetDistanceValues}
                bookmarkList={bookmarkList}
                goToBookmarkedStar={goToBookmarkedStar}
                handleSetFilterValues={handleSetFilterValues}
                filterValues={filterValues}
                handleSetVelMagValues={handleSetVelMagValues}
                velMagValues={velMagValues}
                toggleVel={toggleVel}
                handleToggleVel={handleToggleVel}
                cameraMoving={cameraMoving}
            setCameraMoving={setCameraMoving}
            cameraMovingToHome={cameraMovingToHome}
            setCameraMovingToHome={setCameraMovingToHome}
            />
        </>
    )
}

export default ToolbarWrapper
