import { AuthState } from '../reducers/authReducer';

const selectAuth = () => (state: { auth: AuthState }): AuthState => state.auth;

const sel = <T>(s: ((auth: AuthState) => T)): ((state: { auth: AuthState }) => T) => (state: { auth: AuthState }) => s(selectAuth()(state));

export const selectIsLoaded = () => sel((auth: AuthState) => auth.isLoaded);
export const selectIsConnected = () => sel((auth: AuthState) => auth.isConnected);
export const selectIsUserSignedIn = () => sel((auth: AuthState) => auth.isUserSignedIn);
export const selectIsInProgress = () => sel((auth: AuthState) => auth.isInProgress);
export const selectHasAuthError = () => sel((auth: AuthState) => auth.hasError);
export const selectAuthErrorMessage = () => sel((auth: AuthState) => auth.errorMessage);
export const selectUid = () => sel((auth: AuthState) => auth.uid);
export const selectDisplayName = () => sel((auth: AuthState) => auth.displayName);
export const selectEmail = () => sel((auth: AuthState) => auth.email);
