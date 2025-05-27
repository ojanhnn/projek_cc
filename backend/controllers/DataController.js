import Data from "../models/DataModel.js";

export const getData = async (req, res) => {
    try {
        const response = await Data.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal mengambil data" });
    }
};

export const getDataById = async (req, res) => {
    try {
        const response = await Data.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) return res.status(404).json({ msg: "Data tidak ditemukan" });
        res.status(200).json(response);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal mengambil data berdasarkan ID" });
    }
};

export const createData = async (req, res) => {
    try {
        const {
            judul,
            deskripsi,
            tipe_tugas,
            mata_kuliah,
            deadline,
            file_pendukung,
            status
        } = req.body;

        console.log("USER ID:", req.userId);

        await Data.create({
            judul,
            deskripsi,
            tipe_tugas,
            mata_kuliah,
            deadline,
            file_pendukung,
            status,
            userId: req.userId 
        });

        res.status(201).json({ msg: "Tugas berhasil dibuat" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal membuat tugas" });
    }
};

export const updateData = async (req, res) => {
    try {
        const data = await Data.findOne({
            where: { id: req.params.id }
        });
        if (!data) return res.status(404).json({ msg: "Data tidak ditemukan" });

        await Data.update(req.body, {
            where: { id: req.params.id }
        });

        res.status(200).json({ msg: "Tugas berhasil diperbarui" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal memperbarui data" });
    }
};

export const deleteData = async (req, res) => {
    try {
        const data = await Data.findOne({
            where: { id: req.params.id }
        });
        if (!data) return res.status(404).json({ msg: "Data tidak ditemukan" });

        await Data.destroy({
            where: { id: req.params.id }
        });

        res.status(200).json({ msg: "Tugas berhasil dihapus" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Gagal menghapus data" });
    }
};
