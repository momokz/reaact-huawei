export const secondState = 'secondState';
export const openLayer = 'openLayer';
export const closeLayer = 'closeLayer';
export const navTab = 'navTab';

const secondAction = boolean => {
    return {
        type: secondState,
        boolean
    }
};

const openLayerAction = layer => {
    return {
        type: openLayer,
        layer
    };
};

const closeLayerAction = layer => {
    return {
        type: closeLayer,
        layer
    }
};

const navTabAction = show => {
    return {
        type: navTab,
        show
    }
};

export {
    secondAction,
    openLayerAction,
    closeLayerAction,
    navTabAction
};