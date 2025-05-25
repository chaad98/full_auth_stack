import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
// Always remember that AuthGuard is a function that we need to pass the name parameter of the local strategy, which by default is `local`
export class LocalAuthGuard extends AuthGuard('local') {}
