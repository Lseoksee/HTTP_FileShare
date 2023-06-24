class Utils {
  static Filetype(file) {
    const extension = file.substring(file.lastIndexOf(".")).toLowerCase();

    if (this.isvideo(extension)) {
      return { type: "video", extension: extension };
    } else if (this.isaudio(extension)) {
      return { type: "audio", extension: extension };
    } else if (this.isphoto(extension)) {
      return { type: "photo", extension: extension };
    } else if (this.istxt(extension)) {
      return { type: "txt", extension: extension };
    } else if (this.iszip(extension)) {
      return { type: "zip", extension: extension };
    }
    return { type: "none", extension: extension };
  }

  static isvideo(file) {
    const videoExtensions = [
      ".mp4",
      ".mkv",
      ".avi",
      ".mov",
      ".webm",
      ".m4v",
      ".3gp",
      ".mpg",
      ".mpeg",
    ];

    return videoExtensions.includes(file);
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
      ".alac",
      ".opus",
    ];

    return audioExtensions.includes(file);
  }

  static isphoto(file) {
    const photoExtensions = [
      ".jpeg",
      ".jpg",
      ".png",
      ".gif",
      ".bmp",
      ".svg",
      ".webp",
      ".ico",
    ];

    return photoExtensions.includes(file);
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

    return zipExtensions.includes(file);
  }

  static istxt(file) {
    const txtExtensions = [
      ".txt",
      ".json",
      ".html",
      ".css",
      ".js",
      ".ini",
      ".properties",
      ".java",
      ".c",
      ".cpp",
      ".py",
      ".php",
      ".sql",
      ".kt",
    ];

    return txtExtensions.includes(file);
  }

  static mapsize(size) {
    if (size < 1024) {
      return { size: size, type: "B" };
    } else if (size > 1024 && size < Math.pow(1024, 2)) {
      return { size: size / 1024, type: "KB" };
    } else if (size > Math.pow(1024, 2) && size < Math.pow(1024, 3)) {
      return { size: size / Math.pow(1024, 2), type: "MB" };
    } else if (size > Math.pow(1024, 3) && size < Math.pow(1024, 4)) {
      return { size: size / Math.pow(1024, 3), type: "GB" };
    } else {
      return { size: size / Math.pow(1024, 4), type: "TB" };
    }
  }
}

export default Utils;
