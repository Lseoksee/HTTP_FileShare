class Utill {
  static isvideo(file) {
    const videoExtensions = [
      ".mp4",
      ".mkv",
      ".avi",
      ".mov",
      ".wmv",
      ".flv",
      ".webm",
      ".m4v",
      ".3gp",
      ".mpg",
      ".mpeg",
    ];
    const extension = file.substring(file.lastIndexOf("."));

    return videoExtensions.includes(extension.toLowerCase());
  }

  static isaudio(file) {
    const audioExtensions = [
      ".mp3",
      ".wav",
      ".flac",
      ".aac",
      ".ogg",
      ".wma",
      ".m4a",
      ".aiff",
      ".alac",
      ".opus",
    ];
    const extension = file.substring(file.lastIndexOf("."));

    return audioExtensions.includes(extension.toLowerCase());
  }

  static isphoto(file) {
    const photoExtensions = [
      "jpeg",
      ".jpg",
      ".png",
      ".gif",
      ".bmp",
      ".tiff",
      ".tif",
      ".svg",
      ".webp",
      ".ico",
      ".raw",
      ".psd",
    ];
    const extension = file.substring(file.lastIndexOf("."));

    return photoExtensions.includes(extension.toLowerCase());
  }
}

export default Utill;
