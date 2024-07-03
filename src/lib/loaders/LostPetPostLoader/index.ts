import { LoaderFunction, ParamParseKey, Params } from "react-router-dom";
import { getPostById } from "../../services/post.service";

const Paths = {
    postDetail: "/post/:id",
} as const;

type LostPetPostArgs = {
    params: Params<ParamParseKey<typeof Paths.postDetail>>;
};

const LostPetPostLoader: LoaderFunction = async ({ params }: LostPetPostArgs) => {
    const { id } = params;
    if (!id) return undefined;

    const response = await getPostById(id);
    if (response.isError) return undefined;

    return response.response.data;
};

export default LostPetPostLoader;
