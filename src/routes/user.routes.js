import {Router} from 'express'
import { resistorUser, sendAllUserList } from '../controllers/user.controllers.js'
import { upload } from '../middlewares/multer.middleware.js'

const userRoutes=Router()

userRoutes.route("/resister").post(
    upload.fields([
        {
            name:'userAvatar',
            maxCount:1,
        },
        {
            name:'userCoverImage',
            maxCount:1,
        }
    ]),
    resistorUser,
)

userRoutes.route("/show-all-user-list").get(sendAllUserList)


export default userRoutes