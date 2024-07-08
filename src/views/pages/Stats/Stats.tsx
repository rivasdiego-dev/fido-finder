import {
  Autocomplete,
  AutocompleteItem,
  Card,
  CardBody,
  CardHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import MapComponent from "../../../components/molecules/MapComponent";
import {
  getLostPetsByOneDepartment,
  getLostPetsByOneMunicipality,
} from "../../../lib/services/stats.service";
import departmentsData from "../../../lib/utils/departments.json";
import extractCoordinates from "../../../lib/utils/extractCoordinates";
import municipalitiesData from "../../../lib/utils/municipalities.json";

export default function Stats() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");

  const [departmentPoints, setDepartmentPoints] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [municipalityPoints, setMunicipalityPoints] = useState<
    { lat: number; lng: number }[]
  >([]);

  useEffect(() => {
    const setData = async (selectedDepartment: string) => {
      getLostPetsByOneDepartment(selectedDepartment).then((res) => {
        if (res.isError) {
          console.warn("Error fetching lost pets by department");
          return;
        }

        const { data } = res.response as { data: { geom: string }[] };

        const mappedData = data.map((data) => {
          const coordinates = extractCoordinates(data.geom);
          return {
            lat: coordinates.lat,
            lng: coordinates.lng,
          };
        });

        setDepartmentPoints(mappedData);
      });
    };

    if (selectedDepartment) setData(selectedDepartment);
  }, [selectedDepartment]);

  useEffect(() => {
    const setData = async (selectedMunicipality: string) => {
      getLostPetsByOneMunicipality(selectedMunicipality).then((res) => {
        if (res.isError) {
          console.warn("Error fetching lost pets by municipality");
          return;
        }

        const { data } = res.response as { data: { geom: string }[] };

        const mappedData = data.map((data) => {
          const coordinates = extractCoordinates(data.geom);
          return {
            lat: coordinates.lat,
            lng: coordinates.lng,
          };
        });

        setMunicipalityPoints(mappedData);
      });
    };

    if (selectedMunicipality) setData(selectedMunicipality);
  }, [selectedMunicipality]);

  const loaderdata = useLoaderData() as {
    departments: {
      department: string;
      lost_pets_count: number;
    }[];
    municipalities: {
      municipality: string;
      lost_pets_count: number;
    }[];
    communities: {
      colonia: string;
      lost_pets_count: number;
    }[];
  };

  const selectDepartments = departmentsData.map((department) => {
    return {
      value: department.cod_dpto,
      label: department.nom_dpto,
    };
  });

  const selectMunicipalities = municipalitiesData.map((municipality) => {
    return {
      value: municipality.id,
      label: municipality.nom_mun,
    };
  });

  return (
    <div className="flex-1 p-4 flex flex-col md:flex-row">
      <div className="flex flex-col w-full">
        <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
          Mapas de mascotas perdidas
        </h1>

        <div>
          <h2 className="font-roboto text-xl mb-2 border-b-2 rounded-md px-2 border-gray-300/15">
            Mapas de mascotas perdidas por departamento
          </h2>
          <MapComponent points={departmentPoints} />
          <Autocomplete
            label="Selecciona un departamento"
            className="my-4"
            selectedKey={selectedDepartment}
            onSelectionChange={(value) =>
              setSelectedDepartment(value as string)
            }
          >
            {selectDepartments.map((department) => {
              return (
                <AutocompleteItem
                  key={department.value}
                  value={department.value}
                >
                  {department.label}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
        </div>

        <div>
          <h2 className="font-roboto text-xl mb-2 border-b-2 rounded-md px-2 border-gray-300/15">
            Mapas de mascotas perdidas por municipio
          </h2>
          <MapComponent points={municipalityPoints} />

          <Autocomplete
            label="Selecciona un municipio"
            className="my-4"
            selectedKey={selectedMunicipality}
            onSelectionChange={(value) =>
              setSelectedMunicipality(value as string)
            }
          >
            {selectMunicipalities.map((mun) => {
              return (
                <AutocompleteItem key={mun.value} value={mun.value}>
                  {mun.label}
                </AutocompleteItem>
              );
            })}
          </Autocomplete>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h1 className="font-quicksand text-3xl font-medium text-center mb-4">
          Estadísticas de mascotas perdidas
        </h1>
        <div className="flex-1 flex flex-col md:flex-row w-full justify-evenly gap-4">
          <Card>
            <CardHeader className="bg-gradient-to-t w-full border border-[#202125] from-[#18181b] border-b-[#18181b] via-[#18181b] to-b-primary-900 text-xl font-quicksand tracking-wider font-medium">
              Mascotas perdidas por departamento
            </CardHeader>
            <CardBody className="">
              <div className="h-96 w-full pr-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loaderdata.departments}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="department" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "black" }} />
                    <Legend />
                    <Bar
                      dataKey="lost_pets_count"
                      name="Mascotas perdidas"
                      fill="#C3C3C3"
                      activeBar={{ fill: "#5B9AD5" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-gradient-to-t w-full border border-[#202125] from-[#18181b] border-b-[#18181b] via-[#18181b] to-b-primary-900 text-xl font-quicksand tracking-wider font-medium">
              Mascotas perdidas por municipio
            </CardHeader>

            <CardBody className="">
              <div className="h-96 w-full pr-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loaderdata.municipalities}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="municipality" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "black" }} />
                    <Legend />
                    <Bar
                      dataKey="lost_pets_count"
                      name="Mascotas perdidas"
                      fill="#C3C3C3"
                      activeBar={{ fill: "#5B9AD5" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
          <Card>
            <CardHeader className="bg-gradient-to-t w-full border border-[#202125] from-[#18181b] border-b-[#18181b] via-[#18181b] to-b-primary-900 text-xl font-quicksand tracking-wider font-medium">
              Mascotas perdidas por colonia
            </CardHeader>
            <CardBody className="">
              <div className="h-96 w-full pr-10">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={loaderdata.communities}>
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="colonia" />
                    <YAxis />
                    <Tooltip labelStyle={{ color: "black" }} />
                    <Legend />
                    <Bar
                      dataKey="lost_pets_count"
                      name="Mascotas perdidas"
                      fill="#C3C3C3"
                      activeBar={{ fill: "#5B9AD5" }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
