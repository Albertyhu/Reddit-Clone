import React, { useState, useRef, useCallback } from 'react'
import areEqual  from 'deep-equal'; 

export const useSelection = editor => {
    const [selection, setSelection] = useState(editor.selection); 
    //const previousSelection = useRef(null)
    const setSelectedOptimized = useCallback((newSelection) => {
        //areEqual does a "deep" evaluation of whether the two objects in the parameters
        //...are equal
        if (areEqual(newSelection, selection)) {
            return; 
        }
      //  previousSelection.current = selection; 
        setSelection(newSelection)
    }, [setSelection, selection])

    return [selection, setSelectedOptimized]
}

