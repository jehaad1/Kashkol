import getPath from "./getPath";
import { getTouch, setTouch } from "./touch";
import getPosition from "./getPosition";
import moveObjects from "./moveObjects";
import getNewProps from "./getNewProps";

const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

export { getPath, isMobile, setTouch, getTouch, getPosition, moveObjects, getNewProps };
