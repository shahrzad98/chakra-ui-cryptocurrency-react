type TokenType = {
  access_token: string,
  refresh_token: string,
}
type GetTokenType = {
  Token: string | null,
  RefreshToken: string | null,
}

const clear = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}

const set = (token: TokenType) => {
  localStorage.setItem('access_token', token.access_token);
  localStorage.setItem('refresh_token', token.refresh_token);
}

const get = (): GetTokenType => {
  return {
    Token: localStorage.getItem('access_token'),
    RefreshToken: localStorage.getItem('refresh_token'),
  };
}

const authenticated = (): boolean => {
  return localStorage.getItem('access_token') ? true : false;
}

const TokenManager = {
  clear,
  set,
  get,
  authenticated
}

export default TokenManager
