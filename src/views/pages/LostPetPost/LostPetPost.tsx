import { format, parse } from "@formkit/tempo";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import PetImage from "../../../components/atoms/PetImage";
import MapComponent from "../../../components/molecules/MapComponent";
import {
  deletePost,
  getPostSeenReports,
  markPostAsFound,
} from "../../../lib/services/post.service";
import extractCoordinates from "../../../lib/utils/extractCoordinates";
import { toast } from "sonner";
import { useUserStore } from "../../../lib/store/user";

export default function LostPetPost() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const data = useLoaderData() as ApiPost | undefined;
  const [lastSeen, setLastSeen] = useState<string>(new Date().toISOString());
  const [loading, setLoading] = useState(true);
  const [lastReport, setLastReport] = useState<{ lat: number; lng: number }>({
    lat: 13.70126931473921,
    lng: -89.22451972961427,
  });

  useEffect(() => {
    if (!data) return;

    const fetchLastSeen = async () => {
      setLoading(true);
      const res = await getPostSeenReports(data.id);

      if (res.isError) {
        console.warn("Error fetching last seen");
        return;
      }

      if (res.response.data.length === 0) {
        setLastSeen(data.lost_datetime);
        const coordinates = extractCoordinates(data.lost_in);
        setLastReport(coordinates);
        setLoading(false);
        return;
      }

      const lastReport = res.response.data[res.response.data.length - 1];
      setLastSeen(lastReport.date_seen);
      const coordinates = extractCoordinates(lastReport.geom);
      setLastReport(coordinates);
      console.log(coordinates);
      setLoading(false);
    };

    fetchLastSeen();
  }, [data]);

  if (!data) {
    console.warn("No data found");
    return null;
  }

  const pet = data.pets;
  const lostLocation = extractCoordinates(data.lost_in);

  const handleDeletePost = async (postId: string) => {
    if (!postId) return;

    setLoading(true);
    const res = await deletePost(postId);
    setLoading(false);

    if (res.isError) {
      toast.error("Error deleting post");
      return;
    }
    toast.success("Post has been deleted");
    navigate("/profile");
  };

  const handleMarkAsFound = async () => {
    if (!data) return;

    setLoading(true);
    const res = await markPostAsFound(data.id);

    setLoading(false);
    if (res.isError) {
      toast.error("Error al marcar como encontrado");
      return;
    }
    toast.success("Post marcado como encontrado!");
    navigate("/profile");
  };

  return (
    <section className="flex-1 p-4 flex flex-col gap-6">
      <div className="space-y-2">
        <PetImage
          src={pet.img}
          alt="Lost Pet"
          description={`${pet.breeds.breed} ${pet.colors.color}`}
          petName={pet.name}
        />
        {data.is_lost && user?.id === data.author_id ? (
          <Button
            fullWidth
            variant="flat"
            color="success"
            onClick={handleMarkAsFound}
            className="text-white font-medium tracking-widest"
          >
            Marcar como encontrado
          </Button>
        ) : (
          <p className="font-quicksand font-bold text-4xl text-success w-full text-center">
            Encontrado
          </p>
        )}
        <p className="font-roboto-condensed text-lg">{data.details}</p>
      </div>

      {!loading && lastReport.lat !== 0 && lastReport.lng !== 0 && (
        <div className="space-y-2">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="font-roboto font-medium text-2xl">
                Última vez visto
              </p>
              <p className="text-sm font-roboto-condensed">
                {format(parse(lastSeen), "DD MMMM, YYYY - h:mm A", "es")}
              </p>
            </div>
            <Link to={`/post/${data.id}/seen-reports`}>
              <Button color="secondary" variant="bordered">
                Detalles
              </Button>
            </Link>
          </div>
          <MapComponent
            points={[
              {
                lat: lastReport.lat,
                lng: lastReport.lng,
                title: "",
                description: "",
              },
            ]}
          />

          {data.author_id !== user?.id || !data.is_lost && (
            <div className="flex gap-2">
              <Link to={`/post/${data.id}/report`}>
                <Button size="lg" color="primary" variant="flat">
                  Reportar
                </Button>
              </Link>
              <Link to={`/profile/${data.author_id}`}>
                <Button size="lg" color="primary" fullWidth>
                  Contactar dueño
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}

      <div>
        <p className="font-roboto font-medium text-2xl"> Lugar de extravío </p>
        <MapComponent
          points={{
            lat: lostLocation.lat,
            lng: lostLocation.lng,
            title: "",
            description: "",
          }}
        />
      </div>
      {user?.id === data.author_id && (
        <Button
          size="lg"
          color="danger"
          variant="shadow"
          fullWidth
          onClick={() => handleDeletePost(data.id)}
          disabled={loading}
          className="mt-2"
        >
          Eliminar post
        </Button>
      )}
    </section>
  );
}
