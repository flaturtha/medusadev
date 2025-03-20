import { z } from "zod"

export const PostAdminCreateAuthor = z.object({
  name: z.string(),
})
