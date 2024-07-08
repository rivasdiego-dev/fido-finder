import { Button } from "@nextui-org/react";
import { useState } from "react";
import InteractiveMapElement from "../../../components/atoms/InteractiveMapElement";
import { useNavigate, useParams } from "react-router-dom";
import { createSeenReport } from "../../../lib/services/post.service";
import { toast } from "sonner";

export default function ReportPet() {

    const [position, setPosition] = useState<{ lat: number; lng: number }>({
        lat: 13.70126934940928,
        lng: -89.22444999217987
    });
    const postId = useParams().id as string;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const handleReport = async () => {
        setLoading(true);
        toast.loading("Reportando mascota...", { id: "reporting" });
        const res = await createSeenReport(postId, {
            lat: position.lat,
            lon: position.lng
        });

        if (res.isError) {
            toast.error("Error al reportar la mascota", { id: "reporting" });
            return;
        }

        setLoading(false);
        toast.success("Mascota reportada", { id: "reporting" });
        navigate(`/post/${postId}/seen-reports`);
    }

    return (
        <main className="flex-1 grid place-items-center">
            <div className="p-2 w-full">
                <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
                    Reportar mascota vista
                </h1>
                <InteractiveMapElement
                    points={position}
                    editable
                    onPointChange={setPosition}
                />
                <p className="text-neutral-500 font-roboto font-semibold text-sm text-center">
                    Latitud: {position.lat} <br />  Longitud: {position.lng}
                </p>
                <Button
                    size="lg"
                    color="default"
                    variant="flat"
                    fullWidth
                    onClick={() => navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
                        },
                        (error) => alert(error.message)
                    )}
                >
                    Utilizar ubicación actual
                </Button>

                <Button
                    size="lg"
                    color="primary"
                    variant="shadow"
                    fullWidth
                    onClick={handleReport}
                    disabled={loading}
                    className="mt-2"
                >
                    Reportar
                </Button>
            </div>
        </main>
    )
}
