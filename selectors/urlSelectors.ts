import { UrlState } from '../reducers/urlReducer';

const selectUrl = () => (state: { url: UrlState }): UrlState => state.url;

const sel = <T>(s: ((url: UrlState) => T)): ((state: { url: UrlState }) => T) => (state: { url: UrlState }) => s(selectUrl()(state));

export const selectTypedUrl = () => sel((url: UrlState) => url.typedUrl);
export const selectIsAdding = () => sel((url: UrlState) => url.isAdding);
export const selectIsRemoving = () => sel((url: UrlState) => url.isRemoving);
export const selectHasUrlError = () => sel((url: UrlState) => url.hasError);
export const selectUrlErrorMessage = () => sel((url: UrlState) => url.errorMessage);
export const selectUrlData = () => sel((url: UrlState) => url.urlData);
export const selectKeyToRemove = () => sel((url: UrlState) => url.keyToRemove);
