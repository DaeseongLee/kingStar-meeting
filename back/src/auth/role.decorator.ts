import { SetMetadata } from '@nestjs/common';

export type AllowRoles = 'Participant' | 'Any';


export const Roles = (...roles: AllowRoles[]) => SetMetadata('roles', roles);