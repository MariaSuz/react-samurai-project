export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map(us => {
    if(us[objPropName] === itemId) {
      return {...us, ...newObjProps}
    }
    return us;
})
}
