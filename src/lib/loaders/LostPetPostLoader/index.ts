import { LoaderFunction, ParamParseKey, Params } from "react-router-dom";

const Paths = {
    postDetail: "/post/:id",
} as const;

type LostPetPostArgs = {
    params: Params<ParamParseKey<typeof Paths.postDetail>>;
};

export const LostPetPostLoader: LoaderFunction = async ({ params }: LostPetPostArgs) => {
    const { id } = params;

    return id;
};
