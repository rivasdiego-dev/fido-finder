import { format, parse } from "@formkit/tempo";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import extractCoordinates from "../../../lib/utils/extractCoordinates";
import InteractiveMapElement from "../../../components/atoms/InteractiveMapElement";
import { Button } from "@nextui-org/react";

export default function PetSeenReports() {
    const data = useLoaderData() as ApiSeenReport[];
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
        <div className="p-8">
            {position ? (
                <InteractiveMapElement points={position} centerPoint={position} />
            ) : data.length > 0 ? (
                <InteractiveMapElement
                    points={data.map(report => extractCoordinates(report.geom))}
                    centerPoint={extractCoordinates(data[0].geom)}
                />
            ) : (
                <p className="text-3xl">No hay reportes de avistamiento</p>
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
