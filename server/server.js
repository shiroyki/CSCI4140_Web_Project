var express = require('express');
var app = express();
const cors = require('cors');
const http = require("http").Server(app);
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const axios = require('axios') 
const { send } = require('process');
const Video = require('./output.json')
const editedVideo = require('./embed_video.json')
const multer = require('multer');
 var corsOptions = {
     credentials: true,
     origin: "http://localhost:3000",
//     //origin: "*",
   };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));//important configuration to avoid internal server errors
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname,'/public')));
app.get('/', function (req, res) {
   res.send('Hello World');
})
 
// app.post('/upload', async (req, res) => {
//     try {
//       const { filePath } = req.body;
//       console.log(filePath);
//       // Pass the file path to the execute_python function
//       //execute_python(filePath, 'param2', 'param3');
  
//       res.send({ success: true });
//     } catch (error) {
//       // Handle errors
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });

// app.post('/generateSubtitle', async (req, res) => {
//     try {
      
     
//       res.send({ success: true});
//     } catch (error) {
//       // Handle errors
//       res.status(500).json({ error: 'An error occurred' });
//     }
//   });

const {spawn, exec} = require('child_process')
const autoSubtitleInit = () => {
  exec('pip install git+https://github.com/m1guelpf/auto-subtitle.git', (err, stdout, stderr) => {
  //exec('python ./python_script/setup.py install --user', (err, stdout, stderr) => {
    if (err) {
      console.error(`autoSubtitleInit: Error installing auto-subtitle module: ${err.message}`);
      return;
    }
    console.log('autoSubtitleInit: auto-subtitle module installed.');

    exec('pip install ffmpeg', (err, stdout, stderr) => {
      if (err) {
        console.error(`autoSubtitleInit: Error installing ffmpeg package: ${err.message}`);
        return;
      }
      console.log('autoSubtitleInit: ffmpeg package installed.');
    });

    exec('pip install ffmpeg-python', (err, stdout, stderr) => {
      if (err) {
        console.error(`autoSubtitleInit: Error installing ffmpeg-python package: ${err.message}`);
        return;
      }
      console.log('autoSubtitleInit: ffmpeg-python package installed.');
    });
    exec('pip install ffmpeg', (err, stdout, stderr) => {
      if (err) {
        console.error(`autoSubtitleInit: Error installing ffmpeg package: ${err.message}`);
        return;
      }
      console.log('autoSubtitleInit: ffmpeg package installed.');
    });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'videos'); 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const output = JSON.parse(fs.readFileSync('./output.json', 'utf8'));
  const filename = file.originalname;
  const subtitle = `${filename}.srt`;
  output.push({ filename, subtitle });
  fs.writeFileSync('./output.json', JSON.stringify(output));

  res.status(200).send('File uploaded successfully');
});


function execute_python(p1, p2 , p3) {
    const childPython = spawn('python', ['auto_subtitle.py', p1, p2, p3 ])
    childPython.stdout.on('data', (data) => {
        console.log("stdout:" ,data)
    });
    childPython.stderr.on('data', (data) => {
        console.log("stderr:" , data)
    });
}
async function subtitle_generation_default(filepath) {
  return new Promise((resolve, reject) => {
   //const out = fs.openSync('./video', 'a')
   // const command = `python -m auto_subtitle.cli ${filepath} -o video/ --srt_only=True`; python -m auto_subtitle.cli ./video/short_test.mp4  -o video/ --srt_only=True
    const childProcess = spawn('python', ['-m', 'auto_subtitle.cli', filepath,  '--srt_only=True' ], {
      shell: true,
      //stdio: [ 'ignore', out],
     /// detached: true
  })
    //console.log('Python command:', command);
    
    //const childProcess = exec(command, { shell: true });

    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    childProcess.on('close', (code) => {
      console.log(`Python process exited with code ${code}`);
      resolve(code);
    });

    childProcess.on('error', (error) => {
      console.error(`Python process encountered an error: ${error}`);
      reject(error);
    });
  });
}

app.post('/generate-subtitle', async (req, res) => {
  try {
    const { videoName } = req.body;
    const path = (`./videos/${videoName}`)
    console.log("Subtitle Button is pressed for video:", videoName)
    // exec(`python -m auto_subtitle.cli ./videos/${videoName} -o videos/ --srt_only=True`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     res.sendStatus(500);
    //     return;
    //   }
  
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
  
    //   if (!stderr) {
    //     res.sendStatus(200);
    //   } else {
    //     res.sendStatus(500);

    //   }
    // });

    
    const childProcess = spawn('python', ['-m', 'auto_subtitle.cli', path, '-o', 'videos/', '--srt_only=True' ], {
          shell: true,
          
      })
    
        childProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
    
        childProcess.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        childProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
          if(code == 0){
            
        
            
            
            res.sendStatus(200);

          } else {
            res.sendStatus(500);

          }
          
        });childProcess.on('error', (error) => {
          console.error(`Python process encountered an error: ${error}`);
         
        });
   // }
    //await subtitle_generation_default(path)
  //   const childProcess = spawn('python', ['-m', 'auto_subtitle.cli', path,  '--srt_only=True' ], {
  //     shell: true,
      
  // })

  //   childProcess.stdout.on('data', (data) => {
  //     console.log(`stdout: ${data}`);
  //   });

  //   childProcess.stderr.on('data', (data) => {
  //     console.log(`stderr: ${data}`);
  //   });
  //   childProcess.on('close', (code) => {
  //     console.log(`Python process exited with code ${code}`);
      
  //   });childProcess.on('error', (error) => {
  //     console.error(`Python process encountered an error: ${error}`);
     
  //   });
    
} catch (error) {
    console.log(error)
}
      // subtitle_generation_default(path)
      //   .then((code) => {
      //     if (code === 0) {
      //       console.log("Subtitle Generation successfully:", code);
      //     }
      //     res.sendStatus(200);
      //   })
      //   .catch((error) => {
      //     console.error('Subtitle Generation failed with error:', error);
      //     res.sendStatus(500);
      //   });
      // }
      // catch (error) {
      //   console.error('Error Subtitle Generation:', error);
      //   res.sendStatus(500);}

})
app.post('/embed-subtitle', async (req, res) => {
  try {
    const { videoName } = req.body;
    const path = (`./videos/${videoName}`)
    console.log("Subtitle Button is pressed for video:", videoName)
    // exec(`python -m auto_subtitle.cli ./videos/${videoName} -o embed_videos/ --output_srt=True `, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     res.sendStatus(500);
    //     return;
    //   }
  
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
      
    //   if (!stderr) {
        
    //     const output = JSON.parse(fs.readFileSync('./embed_video.json', 'utf8'));
        
    //     output.push({ videoName });
        
    //     res.sendStatus(200);
    //   } else {
    //     res.sendStatus(500);

    //   }
    // });
    const output = JSON.parse(fs.readFileSync('./embed_video.json', 'utf8'));
    const childProcess = spawn('python', ['-m', 'auto_subtitle.cli', path, '-o', 'embed_videos/', '--output_srt=True' ], {
          shell: true,
          
      })
    
        childProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
    
        childProcess.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        childProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
          if(code == 0){
            
        
            output.push({ videoName });
            
            res.sendStatus(200);

          } else {
            res.sendStatus(500);

          }
          
        });childProcess.on('error', (error) => {
          console.error(`Python process encountered an error: ${error}`);
         
        });
  
    
} catch (error) {
    console.log(error)
}
      

})

app.post('/generate-subtitlePlus', async (req, res) => {
  try {
    const { videoName, language } = req.body;
    const path = (`./videos/${videoName}`)
    console.log("Subtitle Button is pressed for video:" + videoName + "with selected language: "+ language);
    
    // exec(`python -m auto_subtitle.cli ./videos/${videoName} -o videos/ --language ${language} --srt_only=True`, (error, stdout, stderr) => {
    //   if (error) {
    //     console.error(`exec error: ${error}`);
    //     res.sendStatus(500);
    //     return;
    //   }
  
    //   console.log(`stdout: ${stdout}`);
    //   console.log(`stderr: ${stderr}`);
  
    //   if (!stderr) {
    //     const output = JSON.parse(fs.readFileSync('./output.json', 'utf8'));
        
    //     const subtitle = `${videoName}.srt`
   
    //     output.push({ videoName, subtitle });
    //     res.sendStatus(200);
    //   } else {
    //     res.sendStatus(500);

    //   }
    // });
    const output = JSON.parse(fs.readFileSync('./output.json', 'utf8'));
    const childProcess = spawn('python', ['-m', 'auto_subtitle.cli', path, '-o', 'videos/', '--language', language,'--srt_only=True' ], {
          shell: true,
          
      })
    
        childProcess.stdout.on('data', (data) => {
          console.log(`stdout: ${data}`);
        });
    
        childProcess.stderr.on('data', (data) => {
          console.log(`stderr: ${data}`);
        });
        childProcess.on('close', (code) => {
          console.log(`Python process exited with code ${code}`);
          if(code == 0){
            
        
            const subtitle = `${videoName}.srt`
   
            output.push({ videoName, subtitle });
            
            res.sendStatus(200);

          } else {
            res.sendStatus(500);

          }
          
        });childProcess.on('error', (error) => {
          console.error(`Python process encountered an error: ${error}`);
         
        });
  
    
} catch (error) {
    console.log(error)
}
      

})


app.post('/save-video', async (req, res) => {
//app.post('/save-video/:url', async (req, res) => {
//app.post('/save-video/:url/:subtitle', async (req, res) => {
  try {
    const { urlReq } = req.body;
    console.log("url from request body", urlReq)
    //const { url, subtitle } = req.params;
    //console.log("url from url parameter:", url)

    // if (processingQueue.includes(filename)) {
    //   res.sendStatus(200);
    //   return;
    // } processingQueue.push(filename);
    const response = await axios.get(urlReq, { responseType: 'stream' });

    const filename = path.basename(urlReq);
    
    const writeStream = fs.createWriteStream(`./videos/${filename}`);
    response.data.pipe(writeStream);

    const output = JSON.parse(fs.readFileSync('./output.json', 'utf8'));
    const subtitle = `${filename}.srt`
    //output.push({ filename });
    output.push({ filename, subtitle });
    fs.writeFileSync('./output.json', JSON.stringify(output));
    
    
    writeStream.on('finish', () => {
      res.sendStatus(200)
      
    });
    
    writeStream.on('error', (error) => {
      console.error('Error saving video:', error);
      res.sendStatus(500);
    });
  } catch (error) {
    console.error('Error saving video:', error);
    res.sendStatus(500);}
  //   subtitle_generation_default(`./video/${filename}`)
  //   .then((code) => {
  //     if (code === 0) {
  //       console.log("Subtitle Generation successfully:", code);
  //     }
  //     // Remove the processed file from the queue
  //     const fileIndex = processingQueue.indexOf(filename);
  //     if (fileIndex !== -1) {
  //       processingQueue.splice(fileIndex, 1);
  //     }
  //     res.sendStatus(200);
      
  // }).catch((error) => {
  //   console.error('Subtitle Generation failed with error:', error);
  //   // const fileIndex = processingQueue.indexOf(filename);
  //   //     if (fileIndex !== -1) {
  //   //       processingQueue.splice(fileIndex, 1);
  //   //     }
  //       res.sendStatus(500);
  // });
    
  // } catch (error) {
  //   console.error('Error saving video:', error);
  //   res.sendStatus(500);
   //}
});
app.get("/getProgress", (req, res) => {
 
  if (processingQueue.length > 0) {
    res.json({ file: processingQueue[0] });
  } else {
    res.json({ file: null });
  }
});
const outputFilePath = path.join(__dirname, 'output.json');
const videoFileMap = JSON.parse(fs.readFileSync(outputFilePath, 'utf8'));
console.log("videoFileMap",videoFileMap)
app.get('/videos/:filename', (req, res) => {
  const fileName = req.params.filename;
  const video = videoFileMap.find((item) => item.filename === fileName);

  if (!video) {
    return res.status(404).send('File not found');
  }

  const filePath = path.join(__dirname, 'videos', video.filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

app.get('/fetch_Video', async (req, res) => {
 
   

    try {
      
      const videoPath = '../videos/';
      
      const result = Video.map((file, index) => ({
         id: index + 1, 
         filename: file.filename,
         subtitle:  file.filename.replace('.mp4', '') + '.srt'
       
      }));
      console.log("fetch-Video:", result);

      res.json(result);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error parsing data from output.json');
    }
  
});


app.get('/subtitle/:subtitle', (req, res) => {
  const fileName = req.params.subtitle;
  console.log("filename:", fileName);
  const video = videoFileMap.find((item) => item.subtitle === fileName);

  if (!video) {
    return res.status(404).send('File not found');
  }

  const filePath = path.join(__dirname, 'videos', video.subtitle);

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'application/x-subrip',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'application/x-subrip',
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});



















console.log("Initiating PIP package, It may take 3 to 5 mins.")
//autoSubtitleInit();
//subtitle_generation_default(`./videos/test.mp4`)
//test()
const PORT = 8088;
http.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});
// app.listen(PORT, () => {
//   console.log(`server running at ${PORT}`);
// });
app.use(express.json());
