import jwt from "jsonwebtoken";

import { config } from "../config/config";
import { ActionTokenEnum } from "../enums/action.token.enum";
import { StatusCodesEnum } from "../enums/status.codes.enum";
import { TokenEnum } from "../enums/token.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";

class TokenService {
    public generateTokens = (payload: ITokenPayload): ITokenPair => {
        const accessToken = jwt.sign(payload, config.JWT_ACCESS_SECRET, {
            expiresIn: config.JWT_ACCESS_LIFETIME,
        });
        const refreshToken = jwt.sign(payload, config.JWT_REFRESH_SECRET, {
            expiresIn: config.JWT_REFRESH_LIFETIME,
        });
        return { accessToken, refreshToken };
    };

    public verifyToken = (
        token: string,
        type: TokenEnum | ActionTokenEnum,
    ): ITokenPayload => {
        try {
            let secret;

            switch (type) {
                case TokenEnum.ACCESS:
                    secret = config.JWT_ACCESS_SECRET;
                    break;
                case TokenEnum.REFRESH:
                    secret = config.JWT_REFRESH_SECRET;
                    break;
                case ActionTokenEnum.ACTIVATE:
                    secret = config.JWT_ACTIVATE_SECRET;
                    break;
                case ActionTokenEnum.RECOVERY:
                    secret = config.JWT_RECOVERY_SECRET;
                    break;
                default:
                    throw new ApiError(
                        "Invalid token type",
                        StatusCodesEnum.BAD_REQUEST,
                    );
            }

            return jwt.verify(token, secret) as ITokenPayload;
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            throw new ApiError("Invalid token", StatusCodesEnum.UNAUTHORIZED);
        }
    };

    public isTokenExist = async (
        token: string,
        type: TokenEnum,
    ): Promise<boolean> => {
        const iTokenPromise = await tokenRepository.findByParams({
            [type]: token,
        });
        return !!iTokenPromise;
    };

    public generateActionToken = (
        payload: ITokenPayload,
        type: ActionTokenEnum,
    ): string => {
        let secret;
        let expiresIn;

        switch (type) {
            case ActionTokenEnum.ACTIVATE:
                secret = config.JWT_ACTIVATE_SECRET;
                expiresIn = config.JWT_ACTIVATE_LIFETIME;
                break;

            case ActionTokenEnum.RECOVERY:
                secret = config.JWT_RECOVERY_SECRET;
                expiresIn = config.JWT_RECOVERY_LIFETIME;
                break;

            default:
                throw new ApiError(
                    "Invalid action token type",
                    StatusCodesEnum.BAD_REQUEST,
                );
        }

        return jwt.sign(payload, secret, { expiresIn });
    };
}

export const tokenService = new TokenService();
