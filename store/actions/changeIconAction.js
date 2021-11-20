export const CHANGE_ICON = "CHANGE_ICON";

export const addIcon = (saveSuccess) => {
    return { type: CHANGE_ICON, saveSuccess: saveSuccess }
}