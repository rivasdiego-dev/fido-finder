import { useEffect, useState } from "react";
import FullscreenMapComponent from "../../../components/molecules/FullscreenMapComponent";
import { Popup } from "react-leaflet";
import Loader from "../Loader";
import { getPostsAround } from "../../../lib/services/post.service";
import extractCoordinates from "../../../lib/utils/extractCoordinates";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function LostPetMap() {

    // Current position of the user
    const [currentPosition, setCurrentPosition] = useState<GeolocationCoordinates | null>(null);

    // Points to show in the map
    const [postsLocations, setPostsLocations] = useState<{ lat: number; lng: number; popupComponent?: React.ReactNode; }[]>([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentPosition(position.coords);
                    getPostsAround(position.coords.latitude, position.coords.longitude).then((res) => {
                        if (res.isError) {
                            console.error("Error getting posts around:", res.response);
                            return;
                        }
                        const posts = res.response.data as ApiPost[];
                        const locations = posts.map((post) => {
                            const coordinates = extractCoordinates(post.lost_in);
                            return {
                                lat: coordinates.lat,
                                lng: coordinates.lng,
                                popupComponent: (
                                    <Popup closeButton={false} className="p-0">
                                        <div className="flex flex-col items-center">
                                            <div className="flex flex-col items-center w-32">
                                                <p className="font-quicksand font-semibold text-lg leading-3">{post.pets.name}</p>
                                                <div className="h-40 w-full overflow-hidden rounded-md -translate-y-3">
                                                    <img
                                                        src={post.pets.img}
                                                        alt="Pet"
                                                        className="object-cover h-full w-full"
                                                    />
                                                </div>
                                            </div>
                                            <Link to={`/post/${post.id}`} className="w-full">
                                                <Button color="secondary" variant="flat" fullWidth>
                                                    Ver más
                                                </Button>
                                            </Link>
                                        </div>
                                    </Popup>
                                ),
                            };
                        });
                        setPostsLocations(locations);
                    })
                },
                (error) => {
                    console.error("Error getting current position:", error);
                }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    }, []);

    if (!currentPosition) return <Loader />;

    const { latitude, longitude } = currentPosition;

    return (
        <div className="p-4 flex-1 flex flex-col">
            <h1 className="font-quicksand text-3xl font-medium text-center mb-4 px-5">
                Mascotas perdidas cerca de ti
            </h1>
            <FullscreenMapComponent
                points={postsLocations}
                centerPoint={{ lat: latitude, lng: longitude }}
            />
            <p className="text-neutral-500 font-roboto font-semibold text-sm text-center mt-2">
                El círculo representa un radio de 5 km alrededor de tu ubicación actual.
            </p>
        </div>
    );
}
