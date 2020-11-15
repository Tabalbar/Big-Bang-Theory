import React from "react";
import Toolbar from "./Toolbar";

//todo This will hold all the functionality of the toolbar, see example below
function ToolbarWrapper(
    {
        handleHomeButton,
        focusDescription,
        updateStarPosition
    }
){



    return (
        <>
            <Toolbar
                handleHomeButton={handleHomeButton}
                focusDescription={focusDescription}
                updateStarPosition={updateStarPosition}
            />
        </>
    )
}

export default ToolbarWrapper
