import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosJWT, BASE_URL } from "../utils";

const AddNote = () => {
    const [judul, setJudul] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [tipeTugas, setTipeTugas] = useState("Individu");
    const [mataKuliah, setMataKuliah] = useState("");
    const [deadline, setDeadline] = useState("");
    const [filePendukung, setFilePendukung] = useState("");
    const [status, setStatus] = useState("Aktif");

    const navigate = useNavigate();

    const saveNote = async (e) => {
        e.preventDefault();
        try {
            await axiosJWT.post(`${BASE_URL}/data`, {
                judul,
                deskripsi,
                tipe_tugas: tipeTugas,
                mata_kuliah: mataKuliah,
                deadline,
                file_pendukung: filePendukung,
                status
            });
            navigate("/dashbord");
        } catch (error) {
            console.log("Gagal menambahkan tugas:", error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <h1 className="title">Tambah Tugas</h1>
                <form onSubmit={saveNote}>
                    <div className="field">
                        <label className="label">Judul</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={judul}
                                onChange={(e) => setJudul(e.target.value)}
                                placeholder="Judul Tugas"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Deskripsi</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                value={deskripsi}
                                onChange={(e) => setDeskripsi(e.target.value)}
                                placeholder="Instruksi atau deskripsi tugas"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Tipe Tugas</label>
                        <div className="control">
                            <div className="select">
                                <select value={tipeTugas} onChange={(e) => setTipeTugas(e.target.value)}>
                                    <option value="Individu">Individu</option>
                                    <option value="Kelompok">Kelompok</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Mata Kuliah</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={mataKuliah}
                                onChange={(e) => setMataKuliah(e.target.value)}
                                placeholder="Contoh: Pemrograman Web"
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Deadline</label>
                        <div className="control">
                            <input
                                type="datetime-local"
                                className="input"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">File Pendukung (opsional)</label>
                        <div className="control">
                            <input
                                type="text"
                                className="input"
                                value={filePendukung}
                                onChange={(e) => setFilePendukung(e.target.value)}
                                placeholder="URL atau nama file (jika ada)"
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Status</label>
                        <div className="control">
                            <div className="select">
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Aktif">Aktif</option>
                                    <option value="Tidak Aktif">Tidak Aktif</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="field">
                        <button type="submit" className="button is-success">Simpan</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNote;
