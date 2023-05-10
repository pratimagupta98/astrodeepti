const astroGallery = require("../models/astroGallery");
const resp = require("../helpers/apiResponse");
const { uploadFile } = require("../helpers/awsuploader");
const { uploadBase64ImageFile } = require("../helpers/awsuploader");

var signatures = {
  JVBERi0: "application/pdf",
  R0lGODdh: "image/gif",
  R0lGODlh: "image/gif",
  iVBORw0KGgo: "image.png",
  "/9j/": "image.jpg"
};

function detectMimeType(b64) {
  for (var s in signatures) {
    if (b64.indexOf(s) === 0) {
      return signatures[s];
    }
  }
}



exports.upload_astrogallery = async (req, res) => {
  const { astroId } = req.body;

  const newastroGallery = new astroGallery({
    astroId: astroId,
  });

  if (req.files.file) {
    const getimgurl = await uploadFile(
      req.files.file[0]?.path,
      req.files.file[0]?.filename,
      req.files.file[0]?.filename.split('.').pop() // get file extension dynamically
    );
    if (getimgurl) {
      newastroGallery.file = getimgurl.Location;
    }
  }

  newastroGallery
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.addvideobyadmin = async (req, res) => {
  const { videoTitle, } = req.body;

  const newVideo = new Video({
    videoTitle: videoTitle,
    course: course,
    teacher: teacher,
  });

  const findexist = await Video.findOne({ videoTitle: videoTitle });
  if (findexist) {
    resp.alreadyr(res);
  }

  // else{
  // const newVideo = new Video ({
  //     videoTitle : videoTitle,
  //     videolink:videolink,
  //     videoImg :videoImg
  // })
  // if(req.files){
  //     console.log(req.files)
  //     if(req.files.videoImg){
  //         const geturl = await uploadFile(
  //             req.files.videoImg[0]?.path,
  //             req.files.videoImg[0]?.filename,
  //             "jpg"
  //           );
  //           if (geturl) {
  //             newVideo.videoImg = geturl.Location;
  //             //fs.unlinkSync(`../uploads/${req.files.course_image[0]?.filename}`);
  //     }
  // }

  if (req.files.video_file && req.files.video_image) {
    for (let i = 0; i < req.files.video_file.length; i++) {
      const getpdfurl = await uploadFile(
        req.files.video_file[i]?.path,
        req.files.video_file[i]?.filename,
        "mp4"
      );
      newVideo.video_file[i] = geturl.Location;
      // let videoObj = new Object();
      // if (getpdfurl) {
      //   videoObj.video_file = getpdfurl.Location;
      //fs.unlinkSync(`../uploads/${req.files.video_file[i]?.filename}`);
      //  }
      const getimgurl = await uploadFile(
        req.files.video_image[i]?.path,
        req.files.video_image[i]?.filename,
        "jpg"
      );
      // if (getimgurl) {
      //   videoObj.video_image = getimgurl.Location;
      //   //fs.unlinkSync(`../uploads/${req.files.video_image[i]?.filename}`);
      // }
      newVideo.video_image[i] = geturl.Location;
    }
  }

  newVideo
    .save()
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.get_astroGallery = async (req, res) => {
  const findall = await astroGallery
    .find({ astroId: req.params.id })
    .select("file")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
}




exports.deletevideo = async (req, res) => {
  await Video.deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.videobycourse = async (req, res) => {
  const findall = await Video.find({ course: req.params.id })
    .populate("teacher")
    .populate("category_id")
    .populate("video_id")
    .populate("pdf_id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};


exports.viewonevideo = async (req, res) => {
  const findall = await Video.findOne({ _id: req.params.id })

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};