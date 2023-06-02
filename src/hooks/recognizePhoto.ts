import { createWorker } from 'tesseract.js';
import { UserPhoto } from './usePhotoGallery';
import { Filesystem, Directory } from '@capacitor/filesystem';

export const recognizePhoto = async (photo: UserPhoto) => {
    const worker = await createWorker({
        logger: m => console.log(m)
    });

    console.log('recognizePhoto', photo);

    const file = await Filesystem.readFile({
        path: photo.filepath,
        directory: Directory.Data
    });

    (async () => {
        await worker.loadLanguage('ces');
        await worker.initialize('ces');
        const { data: { text } } = await worker.recognize(photo.webviewPath!);
        console.log(text);
        await worker.terminate();
    })();
}
