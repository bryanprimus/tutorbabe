import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const sdkApi = createApi({
	reducerPath: "sdkApi",
	baseQuery: fakeBaseQuery(),
	endpoints: () => ({}),
});
