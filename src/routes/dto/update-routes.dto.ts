import { PartialType } from "@nestjs/swagger";
import { CreateRouteDto } from "./create-routes.dto";

export class UpdateRouteDto extends PartialType(CreateRouteDto){}