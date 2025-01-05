

document.addEventListener("DOMContentLoaded", () => {
    const videoWrapper = document.querySelector(".hobbies-videos");
    const hobbies = document.querySelectorAll(".videos");
    const dots = document.querySelectorAll(".navigation-dots .dot");
    const totalHobbies = hobbies.length;
    const animationDuration = 5000; 
    let hobbiesStartIndex = 0;
    let isVideoPlaying = false; 
    let intervalId;
  
    const updateHobbiesToShow = () => {
      const screenWidth = window.innerWidth;
      return screenWidth < 768 ? 1 : 2;
    };
  
    const updateVisibleHobbies = (direction = 1) => {
      if (isVideoPlaying) return; 
  
      const hobbiesToShow = updateHobbiesToShow();
      hobbiesStartIndex = (hobbiesStartIndex + direction + totalHobbies) % totalHobbies;
  
      const clonedHobbies = [...hobbies].map((hobby) => hobby.cloneNode(true));
      videoWrapper.innerHTML = "";
      for (let i = 0; i < hobbiesToShow; i++) {
        const index = (hobbiesStartIndex + i) % totalHobbies;
        videoWrapper.appendChild(clonedHobbies[index]);
      }
  
      updateActiveDot();
    };
  
    const updateActiveDot = () => {
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === hobbiesStartIndex % dots.length);
      });
    };
  
    const startSliding = () => {
      stopSliding();
      intervalId = setInterval(() => {
        updateVisibleHobbies(1);
      }, animationDuration);
    };
  
    const stopSliding = () => {
      clearInterval(intervalId);
    };
  
    updateVisibleHobbies();
    startSliding();
  
    hobbies.forEach((hobby) => {
      const video = hobby.querySelector("video");
      if (video) {
        video.addEventListener("play", () => {
          isVideoPlaying = true;
          stopSliding();
        });
        video.addEventListener("pause", () => {
          isVideoPlaying = false;
          startSliding(); 
        });
        video.addEventListener("ended", () => {
          isVideoPlaying = false;
          startSliding();
        });
      }
    });
  
    // YouTube IFrame API integration
    const initializeYouTubeIFrames = () => {
      const iframes = document.querySelectorAll("iframe");
  
      iframes.forEach((iframe) => {
        const player = new YT.Player(iframe, {
          events: {
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                isVideoPlaying = true;
                stopSliding(); 
              } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                isVideoPlaying = event.data === YT.PlayerState.PAUSED;
                if (!isVideoPlaying) startSliding(); 
              }
            },
          },
        });
      });
    };
  
    // Load YouTube IFrame API
    if (typeof YT !== "undefined" && YT.Player) {
      initializeYouTubeIFrames();
    } else {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      window.onYouTubeIframeAPIReady = initializeYouTubeIFrames;
    }
  
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        hobbiesStartIndex = index;
        updateVisibleHobbies(0); 
        if (!isVideoPlaying) {
          stopSliding(); 
          startSliding();
        }
      });
    });
  
    window.addEventListener("resize", () => {
      updateVisibleHobbies();
    });
  });
  
  
  
  
  
  const audioFolders = document.querySelectorAll(".audio-folder");
  const audioTracks = document.querySelectorAll(".audio-tracks");
  
  audioFolders.forEach((folder, index) => {
      folder.addEventListener("click", () => {
          const tracks = audioTracks[index]; 
          if (tracks.style.display === "none" || tracks.style.display === "") {
              tracks.style.display = "block";
              folder.classList.add('active'); 
          } else {
              tracks.style.display = "none";
              folder.classList.remove('active'); 
          }
      });
  });
  
  
  
  