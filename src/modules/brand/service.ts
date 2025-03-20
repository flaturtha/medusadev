import { MedusaService } from "@medusajs/framework/utils"
import { Brand } from "./models/brand"

class BrandModuleService extends MedusaService({
  Brand,
}) {
  async list(config = {}) {
    return await this.repository_.find(config)
  }
  
  async create(data) {
    return await this.createBrands([data]).then(brands => brands[0])
  }
  
  async retrieveBrand(id) {
    return await this.retrieve(id)
  }
}

export default BrandModuleService
