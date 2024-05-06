import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost:8088',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});
service.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error('axios err:', error);
      return Promise.reject(error);
    }
  );
class axios_service {
    save_video(data) { //upload file or download file to server side folders then generate subtitles for video without embedding into the video
        return service.post("/save-video", data)
    }

    fetch_video(data) { //show all video to homepage from /server/video with the use of json to declare file paths
        return service.get("/fetch_Video", data)
    }

    fetch_embeddedVideo(data) { //show all video embedded with generated subtitles to Result page from /server/python_script/auto_subtitle/subtitled with the use of json to declare file paths
        return service.get("/embed-review", data)
    }
    getProgress(data) { //show the progress of subtitle generation on status bar on navbar.
        return service.get("/getProgress", data)
    }
    uploadFile(data) {
        return service.post("/upload",data)
    }
    Subtitle_Generate(data) { //process subtitle generation from the button press on homepage according to the selected video
        return service.post("/generate-subtitle", data)
    }
    Subtitle_GeneratePlus(data) { //process subtitle generation from the button press on homepage according to the selected video with language option (language must be similar to the one used in the video)
        return service.post("/generate-subtitlePlus", data)
    }
    Subtitle_Embed(data) { 
        return service.post("/embed-subtitle", data)
    }

}
export default new axios_service();