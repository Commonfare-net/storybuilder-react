export default function fakeUploader(file, onProgress) {
  return new Promise((resolve, reject) => {
    let progress = 0;

    const interval = setInterval(function () {
      console.log('uploading', progress)

      if (progress < 100) {
        progress += 5;
        onProgress(progress);
      } else {
        clearInterval(interval);
        resolve("http://placekitten.com/g/400/400");
      }
    }, 200);
  })
}
