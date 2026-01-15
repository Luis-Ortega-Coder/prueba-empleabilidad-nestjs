export class JwtPayload {
  id: number
  sub: string;        
  role: string;
  iat?: number;
  exp?: number;
}
