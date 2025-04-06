import {AxiosResponse} from "axios";

export type ResType<T> = Promise<AxiosResponse<T>>