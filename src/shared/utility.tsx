export const updateObject = (oldObject: any, updatedProperties: any) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};

export const checkValidity = (value: string, rules: any) => {
    let isValid = true;
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.decimal) {
        isValid = /^[-]?\d+(\.\d{1,})?$/.test(value) && isValid;
    }
    return isValid;
}

export const mapControlsToFormElements = (controls: any) => {    
    const formElementsArray = [];
    for(let key in controls) {
        formElementsArray.push({
            id: key,
            config: controls[key]
        })
    }
    return formElementsArray;
}

export const getSongDurationDisplayTime = (song: any) => {
    const seconds = ~~(song.duration/1000);
    const minutes = ~~(seconds/60);
    const restOfSeconds = seconds % 60;
    const minDisplay = minutes > 9 ? minutes.toString() : '0' + minutes;
    const secDisplay = restOfSeconds > 9 ? restOfSeconds.toString() : '0' + restOfSeconds;
    return minDisplay + ":" + secDisplay;
}