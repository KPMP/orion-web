export const dtdToPackageTypeOptions = (formDTD) => {
    let packageTypeFieldArr = formDTD.standardFields.fields.filter(field => {
        return field.hasOwnProperty("fieldName") && field.fieldName === "packageType"
    });
    let packageTypeOptions = packageTypeFieldArr[0].values.map(value => {
        return { value: value, label: value }
    });
    packageTypeOptions.sort((option1, option2) => {
        let returnVal = 0;
        let label1 = option1.label.toUpperCase();
        let label2 = option2.label.toUpperCase();
        if (label1 < label2) {
            returnVal = -1;
        }
        if (label1 > label2) {
            returnVal = 1;
        }
        return returnVal;
    });
    packageTypeOptions.push({ value: "Other", label: "Other"});
    return packageTypeOptions;
}
