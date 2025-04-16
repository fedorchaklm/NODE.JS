import { IToken, ITokenModel, ITokenPair } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
    public create = (dto: ITokenModel): Promise<ITokenPair> => {
        return Token.create(dto);
    };

    public findByParams = (params: Partial<IToken>) => {
        return Token.findOne(params);
    };

    public deleteTokensBeforeDate = async (date: Date): Promise<number> => {
        const result = await Token.deleteMany({
            createdAt: { $lt: date },
        });
        return result.deletedCount;
    };
}

export const tokenRepository = new TokenRepository();
