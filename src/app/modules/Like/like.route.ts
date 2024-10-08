import { Router } from 'express';
import auth from '../../Middleware/auth';
import { USER_Role } from '../User/user.constant';
import { LikeController } from './like.controller';

const router = Router();

router.post(
  '/upvote/:postId',
  auth(USER_Role.user, USER_Role.admin),
  LikeController.upvotePost,
);

router.post(
  '/downvote/:postId',
  auth(USER_Role.user, USER_Role.admin),
  LikeController.downvotePost,
);

router.get(
  '/upvotesCount/:postId',
  auth(USER_Role.user, USER_Role.admin),
  LikeController.getTotalUpvotes,
);
router.get(
  '/downvotesCount/:postId',
  auth(USER_Role.user, USER_Role.admin),
  LikeController.getTotalDownvotes,
);

export const LikeRoutes = router;
