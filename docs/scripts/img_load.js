// List of image URLs you want to preload with relative paths
const images = [
    './images/bg_01.png',
    './images/bg_02.png',
    './images/bg_03.png',
    './images/bg_04.png',
    './images/bg_01_m.png',
    './images/bg_02_m.png',
    './images/bg_03_m.png',
    './images/bg_04_m.png'
  ];
  
  // Preload the images
  window.onload = () => {
    let loadedImages = 0;
    const totalImages = images.length;
  
    images.forEach(imageUrl => {
      const img = new Image();
      img.onload = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
          // Trigger CSS animation or any other functionality after all images are loaded
          document.querySelector('main').classList.add('images-loaded');  // Add the class to the <main> element
        }
      };
      img.src = imageUrl;
    });
  };
  

