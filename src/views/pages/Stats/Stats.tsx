import { useLoaderData } from 'react-router-dom';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function Stats() {

    const loaderdata = useLoaderData();

    console.log(loaderdata);

    return (
        <div className='flex-1'>

            

            <div className='h-96 p-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={loaderdata.departments}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip
                            labelStyle={{ color: 'black' }}
                        />
                        <Legend />
                        <Bar dataKey="lost_pets_count" name='Mascotas perdidas' fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='h-96 p-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={loaderdata.municipalities}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="municipality" />
                        <YAxis />
                        <Tooltip
                            labelStyle={{ color: 'black' }}
                        />
                        <Legend />
                        <Bar dataKey="lost_pets_count" name='Mascotas perdidas' fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='h-96 p-4'>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={loaderdata.communities}
                    >
                        <CartesianGrid strokeDasharray="1 1" />
                        <XAxis dataKey="colonia" />
                        <YAxis />
                        <Tooltip
                            labelStyle={{ color: 'black' }}
                        />
                        <Legend />
                        <Bar dataKey="lost_pets_count" name='Mascotas perdidas' fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
