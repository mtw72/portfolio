/**
 * File name: resizeImage.js
 *  
 * Task: `img`. (type "node img" in the terminal), or node + file name
 *
 * Resizes PNG, JPEG, WebP and TIFF images.
 *
 * This task does the following:
 *     1. Gets the source of images raw folder
 *     2. Resizes PNG, JPEG, WebP and TIFF images according to different needs
 *     3. Generates and saves the re-sized images in images resized folder
 *
 * This task will run only once, if you want to change the parameter, 
 * you have to run it again, do it with the command `gulp imageOptiTask`.
 *
 * Read the following to change these options.
 * @link https://github.com/lovell/sharp
 * @link https://github.com/VLabStudio/Tutorials/blob/master/Image%20Processing%20in%20Node.js%20with%20Sharp/app.js
 */

// Config variables
const imgRawSRC = "./src/assets/images/raw/";
const imgResizedDEST = "./src/assets/images/resized/"; //The folder must be manually created
const jpg = ".jpg";
const jpeg = ".jpeg";
const png = ".png";

// Import dependencies
const sharp = require("sharp");

(async function () {

    try {
        //Function to resize images
        function resizeImage(inputImagePath, outputImagePath, width, height) {
            sharp(inputImagePath)
                .resize(Math.round(width * 1.3), Math.round(height * 1.3)) //give some buffer for the web to generate the images
                .toFile(outputImagePath);
        }

        // copy the image from the raw folder to the resize folder
        sharp(imgRawSRC + "arrow-right" + png)
            .toFile(imgResizedDEST + "arrow-right" + png);

        sharp(imgRawSRC + "pen" + png)
            .toFile(imgResizedDEST + "pen" + png);

        // OG Image: use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        // Twitter Card Image: requirements vary from time to time. Follow the OG Image. Image must be less than 1MB in size.
        sharp(imgRawSRC + "meta-image" + png)
            .toFile(imgResizedDEST + "meta-image" + png);

        // Carousel Images - different sizes on different viewport widths
        // resizeImage(imgRawSRC + "r2-googletest" + jpg, imgResizedDEST + "r2-googletest" + jpeg, 500, 574.7);
        // resizeImage(imgRawSRC + "wireframe-iPad" + jpg, imgResizedDEST + "wireframe-iPad" + jpeg, 500, 574.7);
        resizeImage(imgRawSRC + "r2-googletest" + jpg, imgResizedDEST + "r2-googletest" + jpeg, 500, 581.39);
        resizeImage(imgRawSRC + "wireframe-iPad" + jpg, imgResizedDEST + "wireframe-iPad" + jpeg, 500, 581.39);

        console.log('IMAGES RESIZE — completed!');

    } catch (error) {
        console.log(error);
    }
})();