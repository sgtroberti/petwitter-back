import { validateRequest } from "../middleware/auth.js";
import * as PostController from "../controllers/post-controller.js";
import { paginationParams } from "../middleware/pagination.js";

export default {
  getAllPosts: {
    method: "GET",
    url: "/posts",
    preHandler: [validateRequest, paginationParams],
    handler: PostController.index,
  },
  createPost: {
    method: "POST",
    url: "/posts",
    preHandler: [validateRequest],
    handler: PostController.createPost,
  },
};
