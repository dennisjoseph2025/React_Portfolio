const mouse = { x: -9999, y: -9999 };

export const getMouse = () => mouse;
export const setMouse = (x, y) => { mouse.x = x; mouse.y = y; };
