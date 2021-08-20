export class JwtAutResponse {
    id: string | undefined;
    username: string | undefined;
    email: string | undefined;
    roles: string[] | undefined;
    tokenType: string | undefined;
    accessToken: string | undefined;
}