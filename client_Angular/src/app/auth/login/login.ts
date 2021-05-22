export interface Login {
  readonly username: string;
  readonly user_password: string;
}

export interface LoginResponse {
  readonly user: {
    readonly user_id: string;
    readonly username: string;
    readonly permissions: Array<string>;
  };
  readonly tokens: {
    readonly accessToken: string;
    readonly refreshToken: string;
  };
}
