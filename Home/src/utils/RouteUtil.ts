import type { PathValue } from "../const/ApiPath";
import { isEmpty } from "./StringUtil";

export const route = (path: PathValue, query?: string): void => {
    let pageURL = path;

    if (!isEmpty(query)) {
        pageURL += query!;
    }

    window.location.href = pageURL;
};
