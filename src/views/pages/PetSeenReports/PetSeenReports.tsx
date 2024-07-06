import { format, parse } from "@formkit/tempo";
import { Link, useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";
import extractCoordinates from "../../../lib/utils/extractCoordinates";
import InteractiveMapElement from "../../../components/atoms/InteractiveMapElement";
import { Button } from "@nextui-org/react";

export default function PetSeenReports() {
    const data = useLoaderData() as ApiSeenReport[];
    const postId = useParams().id as string;
    const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    const handleReportClick = (report: ApiSeenReport) => {
        const coordinates = extractCoordinates(report.geom);
        setPosition(coordinates);
        setSelectedReportId(report.id);
    };

    const handleDeselect = () => {
        setPosition(null);
        setSelectedReportId(null);
    };

    return (
        <div className="p-8 flex-1 flex flex-col">
            <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
                Avistamientos de mascota
            </h1>
            {position ? (
                <InteractiveMapElement points={position} centerPoint={position} />
            ) : data.length > 0 ? (
                <InteractiveMapElement
                    points={data.map(report => extractCoordinates(report.geom))}
                    centerPoint={extractCoordinates(data[0].geom)}
                />
            ) : (
                <div className="flex-1 grid place-items-center">
                    <div className="flex flex-col gap-4">
                        <p className="text-3xl text-center">No hay reportes de avistamiento</p>
                        <Link to={`/post/${postId}/report`}>
                            <Button fullWidth size="lg">
                                Reportar avistamiento
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            <div className="mt-4">
                {data.map(report => (
                    <div
                        key={report.id}
                        onClick={() => handleReportClick(report)}
                        className={`flex justify-between w-full p-2 cursor-pointer text-xl rounded-md ${selectedReportId === report.id ? 'bg-b-primary-100' : ''} ${selectedReportId === report.id ? 'text-b-primary-600' : ''}`}
                    >
                        <p className="capitalize font-roboto font-semibold">{format(parse(report.date_seen), 'MMMM DD', 'es')}</p>
                        <p className="capitalize font-roboto-condensed">{format(parse(report.date_seen), 'hh:mm A', 'es')}</p>
                    </div>
                ))}
                {position && (
                    <Button
                        variant="shadow"
                        color="primary"
                        fullWidth
                        size="lg"
                        onClick={handleDeselect} className="mt-4 p-2"
                    >
                        Ver todos
                    </Button>
                )}
            </div>
        </div>
    );
}
