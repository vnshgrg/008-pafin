import type { Request } from 'express';

import type { Principal } from './principal';

export type AuthenticatedRequest = Request & { principal: Principal };
