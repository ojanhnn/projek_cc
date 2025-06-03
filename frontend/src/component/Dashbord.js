import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';

const BASE_URL = "https://be-577895441870.asia-southeast2.run.app";

const Dashboard = () => {
    const [name, setName] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [note, setNote] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const initialize = async () => {
            await refreshToken();
            await getData();
        };
        initialize();
    }, []);

    const refreshToken = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/token`);
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get(`${BASE_URL}/token`);
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getData = async () => {
        try {
            const response = await axiosJWT.get(`${BASE_URL}/data`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setNote(response.data);
        } catch (error) {
            console.error("Gagal mengambil data tugas:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axiosJWT.delete(`${BASE_URL}/data/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            getData();
        } catch (error) {
            console.error("Gagal menghapus tugas:", error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-full">
                <h1 className="title">Selamat datang, {name}</h1>
                <Link to="/add" className="button is-success mb-4">Tambah Tugas</Link>
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Judul</th>
                            <th>Deskripsi</th>
                            <th>Tipe</th>
                            <th>Mata Kuliah</th>
                            <th>Deadline</th>
                            <th>File</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {note.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.judul}</td>
                                <td>{item.deskripsi}</td>
                                <td>{item.tipe_tugas}</td>
                                <td>{item.mata_kuliah}</td>
                                <td>{new Date(item.deadline).toLocaleString()}</td>
                                <td>
                                    {item.file_pendukung 
                                        ? <a href={item.file_pendukung} target="_blank" rel="noopener noreferrer">Lihat File</a> 
                                        : "Tidak Ada"}
                                </td>
                                <td>{item.status}</td>
                                <td>
                                    <Link to={`/edit/${item.id}`} className="button is-small is-info mr-2">Edit</Link>
                                    <button onClick={() => deleteNote(item.id)} className="button is-small is-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
