import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"

import { createBrandWorkflow } from "../../../workflows/create-brand"
import { z } from "zod"
import { PostAdminCreateBrand } from "./validators"

type PostAdminCreateBrandType = z.infer<typeof PostAdminCreateBrand>

// ✅ POST /admin/brands - Creates a new brand
export const POST = async (
  req: MedusaRequest<PostAdminCreateBrandType>,
  res: MedusaResponse
) => {
  const { result } = await createBrandWorkflow(req.scope).run({
    input: req.validatedBody,
  })

  res.json({ brand: result })
}

// 🚀 ✅ ADD THIS: GET /admin/brands - Lists all brands
export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const brandService = req.scope.resolve("brandService") // Ensure this exists
  const brands = await brandService.list() // Fetch all brands

  res.json({ brands })
}

