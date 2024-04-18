import express from "express";
import fileSystem from "fs";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: true,
    })
);

app.get("/audio-stream", (req, res) => {
    const filePath = __dirname + "/assets/raindrop.mp3";
    const audioStream = fileSystem.createReadStream(filePath);

   
    audioStream.pipe(res);

});

app.listen(3333, () => {
    console.log("Server is running on port 3333");
});
