import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import InteractiveMapElement from "../../../components/atoms/InteractiveMapElement";
import { deleteUserResidence, updateUserResidence } from "../../../lib/services/users.service";

const EditResidence = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 13.70126934940928,
    lng: -89.22444999217987
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleReport = async () => {
    setLoading(true);
    toast.loading("Guardando...", { id: "reporting" });
    const res = await updateUserResidence({ lat: position.lat, lon: position.lng });
    if (res.isError) {
      toast.error("Error al guardar la información", { id: "reporting" });
      return;
    }

    setLoading(false);
    toast.success("Localización de residencia actualizada con éxito!", { id: "reporting" });
    navigate(`/profile`);
  }

  const handleDeleteLocation = async () => {
    setLoading(true);
    toast.loading("Eliminando...", { id: "reporting" });
    const res = await deleteUserResidence();
    if (res.isError) {
      toast.error("Error al eliminar la información", { id: "reporting" });
      return;
    }

    setLoading(false);
    toast.success("Localización de residencia eliminada con éxito!", { id: "reporting" });
    navigate(`/profile`);
  }

  return (
    <main className="flex-1 grid place-items-center">
      <div className="p-2 w-full">
        <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
          Lugar de residencia
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
          Guardar
        </Button>

        <Button
          size="lg"
          color="danger"
          variant="shadow"
          fullWidth
          onClick={handleDeleteLocation}
          disabled={loading}
          className="mt-2"
        >
          Eliminar mi ubicación
        </Button>
        <p className="text-sm text-primary-200 mt-4 px-8">
          Al eliminar tu ubicación, los registros de la misma no podran ser recuperados y no podremos enviarte contenido relevante cerca.
        </p>
      </div>
    </main>
  )

};

export default EditResidence;
