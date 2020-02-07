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