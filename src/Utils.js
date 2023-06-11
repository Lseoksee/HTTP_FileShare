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
      ".jpeg",
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
  
  static iszip(file) {
    const zipExtensions = [
      ".zip",
      ".rar",
      ".7z",
      ".tar",
      ".gz",
      ".bz",
      ".bz2",
      ".xz",
      ".lzh",
      ".cab",
      ".iso",
      ".img",
      ".dmg",
      ".egg",
    ];
    const extension = file.substring(file.lastIndexOf("."));

    return zipExtensions.includes(extension.toLowerCase());
  }

  static mapsize(size) {
    if (size < 1024) {
      return {size: size, type: "B"}

    } else if (size > 1024 &&  size < Math.pow(1024, 2)) {
      return {size: size/1024,  type: "KB"}

    } else if (size > Math.pow(1024, 2) &&  size < Math.pow(1024, 3)) {
      return {size: size / Math.pow(1024, 2), type: "MB"}

    } else if (size > Math.pow(1024, 3) && size < Math.pow(1024, 4)) {
      return {size: size / Math.pow(1024, 3), type: "GB"}

    } else {
      return {size: size / Math.pow(1024, 4), type: "TB"}
    }
  }
}

export default Utill;
