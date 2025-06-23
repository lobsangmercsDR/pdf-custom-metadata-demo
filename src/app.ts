import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { execFile } from "child_process";
import { exiftool, exiftoolPath } from "exiftool-vendored";

const app = express();
const PORT = 3000;

app.use(express.static("public"));

// Configuración de almacenamiento para Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    const safeName = file.originalname.replace(/[^\w.\-]/g, "_");
    cb(null, Date.now() + "_" + safeName);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("pdf"), async (req: Request, res: Response): Promise<void> => {
  if (!req.file?.path) {
    res.status(400).send("No se ha enviado un archivo PDF");
    return;
  }

  const filePath = req.file.path;

  try {
    const binaryPath = await exiftoolPath();
    const configPath = path.resolve(__dirname, "../config/ExifTool_config");

    await new Promise<void>((resolve, reject) => {
      execFile(
        binaryPath,
        [
          "-config", configPath,
          "-overwrite_original",
          "-XMP-dc:Title=Example Metadata",
          "-XMP-dc:Creator=The testing Lobster",
          "-XMP-firma:custom_id=DOC-001-TEST",
          "-XMP-firma:project=Demo XMP",
          filePath,
        ],
        (error, stdout, stderr) => {
          if (error) return reject(stderr || error);
          resolve();
        }
      );
    });

    const metadata = await exiftool.read(filePath);

    const camposPersonalizados = {
      "XMP-dc:Title": (metadata as any)["XMP-dc:Title"],
      "XMP-dc:Creator": (metadata as any)["XMP-dc:Creator"],
      "XMP-firma:custom_id": (metadata as any)["XMP-firma:custom_id"],
      "XMP-firma:project": (metadata as any)["XMP-firma:project"],
    };

    const metadataString = encodeURIComponent(JSON.stringify(camposPersonalizados));
    res.redirect(`/index.html?metadata=${metadataString}`);
  } catch (err) {
    console.error("❌ Error al procesar el PDF:", err);
    res.status(500).send("Error al procesar el PDF");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
