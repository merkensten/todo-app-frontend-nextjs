import jwt_decode from 'jwt-decode';

type DecodedTokenType = {
  exp: number;
  iat: number;
  user: {
    id: string;
    username: string;
    userLevel: number;
  };
};

function getTokenInfo(token: string): DecodedTokenType {
  return jwt_decode(token);
}

export { getTokenInfo };
