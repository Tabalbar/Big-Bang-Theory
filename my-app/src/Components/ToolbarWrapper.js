import React from "react";
import Toolbar from "./Toolbar";

//todo This will hold all the functionality of the toolbar, see example below
function ToolbarWrapper(
    {
        handleHomeButton
    }
){



    return (
        <>
            <Toolbar
                handleHomeButton={handleHomeButton}
            />
        </>
    )
}

export default ToolbarWrapper
