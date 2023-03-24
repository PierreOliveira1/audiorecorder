function audioRecorder() {
  let mediaRecorder = null, audioChunks = [];

  if (!navigator.mediaDevices?.getUserMedia) {
    throw new Error(
      "Browser API navigator.mediaDevices.getUserMedia not available"
    );
  }

  function start() {
    audioChunks = [];

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.start();
      })
      .catch((error) => {
        throw new Error(error);
      });
  }

  return {
    start,
  };
}

export { audioRecorder };
