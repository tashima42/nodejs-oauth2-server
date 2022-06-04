import {GetUserInfoUseCase} from "./get-user-info-use-case";
import {GetUserInfoController} from "./get-user-info-controller";

// Instantiate use case
const getUserInfoUseCase = new GetUserInfoUseCase()
// Instantiate controller
const getUserInfoController = new GetUserInfoController(getUserInfoUseCase)

export {getUserInfoController}
