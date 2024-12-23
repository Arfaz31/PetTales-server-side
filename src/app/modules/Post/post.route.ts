import { Router } from 'express';
import auth from '../../Middleware/auth';
import { USER_Role } from '../User/user.constant';
import validateImageFileRequest from '../../Middleware/validateImageFileRequest';
import { ImageFilesArrayZodSchema } from './postImage.validation';
import { parseBody } from '../../Middleware/bodyParser';
import validateRequest from '../../Middleware/validateRequest';
import { createPostZodSchema, updatePostZodSchema } from './post.validation';
import { PostController } from './post.controller';
import { uploadMultipleImage } from '../../config/multer.config';

const router = Router();
router.post(
  '/create-post',
  auth(USER_Role.user, USER_Role.admin),
  uploadMultipleImage,
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(createPostZodSchema),
  PostController.createPost,
);

router.get(
  '/',
  auth(USER_Role.admin, USER_Role.user),
  PostController.getAllPosts,
);

router.get(
  '/myPremium-postCount',
  auth(USER_Role.user, USER_Role.admin),
  PostController.MyAllPremiumPostCount,
);

router.get(
  '/unlocking-users-and-earnings',
  auth(USER_Role.user, USER_Role.admin),
  PostController.getUnlockingUsersAndEarnings,
);
router.get(
  '/myUnlockPosts',
  auth(USER_Role.user, USER_Role.admin),
  PostController.myUnlockPosts,
);

// Route to get a single post (with premium content restriction)
router.get(
  '/:id',
  auth(USER_Role.user, USER_Role.admin),
  PostController.getSinglePost,
);

router.get(
  '/my-posts/:id',
  auth(USER_Role.user, USER_Role.admin),
  PostController.getMyAllPosts,
);

router.patch(
  '/update-post/:id',
  auth(USER_Role.user, USER_Role.admin),
  uploadMultipleImage,
  // validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(updatePostZodSchema),
  PostController.updateMyPost,
);

router.patch(
  '/unpublish-post/:id',
  auth(USER_Role.admin),
  PostController.unpublishPost,
);
router.patch(
  '/publish-post/:id',
  auth(USER_Role.admin),
  PostController.publishPost,
);

router.delete(
  '/delete/:id',
  auth(USER_Role.user, USER_Role.admin),
  PostController.deletePost,
);

export const PostRoutes = router;
