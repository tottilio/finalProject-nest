import { PartialType } from '@nestjs/mapped-types';
import { CreateBusTimetableDto } from './create-bus-time.dto';

export class UpdateBusTimetableDto extends PartialType(CreateBusTimetableDto) {}
