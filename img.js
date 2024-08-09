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

        // // Hero images
        // resizeImage(imgRawSRC + "home-bg-sm" + jpeg, imgResizedDEST + "home-bg-sm" + jpeg, 450, 450 * 4 / 3);
        // resizeImage(imgRawSRC + "home-bg-md" + jpeg, imgResizedDEST + "home-bg-md" + jpeg, 931, 931 * 4 / 5);
        // resizeImage(imgRawSRC + "home-bg-lg" + jpeg, imgResizedDEST + "home-bg-lg" + jpeg, 1500, 1500 * 9 / 16);

        // OG Image: use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        // Twitter Card Image: requirements vary from time to time. Follow the OG Image. Image must be less than 1MB in size.
        // unchanged but copy the image from the raw folder to the resize folder
        sharp(imgRawSRC + "meta-image" + png)
            .toFile(imgResizedDEST + "meta-image" + png);

        // // OG Image: use images with a 1.91:1 ratio and minimum recommended dimensions of 1200x630 for optimal clarity across all devices.
        // resizeImage(imgRawSRC + "og-image" + jpeg, imgResizedDEST + "og-image" + jpeg, 1200, 630);

        // //Food Images - same size on different viewport widths
        // const foodImageNames = [
        //     "salmon-spaghetti",
        //     "satay-chicken-skewers",
        //     "thai-pineapple-fried-rice"
        // ];

        // foodImageNames.forEach(imageName => {
        //     resizeImage(imgRawSRC + imageName + jpeg, imgResizedDEST + imageName + jpeg, 380, 501);
        // });

        // // Reservation Photo - different sizes on different viewport widths
        // resizeImage(imgRawSRC + "r2place-entrance" + jpeg, imgResizedDEST + "r2place-entrance-sm" + jpeg, 425, 425 / 1.68);
        // resizeImage(imgRawSRC + "r2place-entrance" + jpeg, imgResizedDEST + "r2place-entrance-md" + jpeg, 600, 600 / 1.68);

        // Carousel Images - different sizes on different viewport widths
        resizeImage(imgRawSRC + "r2-googletest" + jpg, imgResizedDEST + "r2-googletest-xxxs" + jpeg, 282, 324.13);
        resizeImage(imgRawSRC + "r2-googletest" + jpg, imgResizedDEST + "r2-googletest-xxs" + jpeg, 414, 475.86);
        resizeImage(imgRawSRC + "r2-googletest" + jpg, imgResizedDEST + "r2-googletest-xs" + jpeg, 500, 574.7);
        resizeImage(imgRawSRC + "wireframe-iPad" + jpg, imgResizedDEST + "wireframe-iPad-xxxs" + jpeg, 282, 324.13);
        resizeImage(imgRawSRC + "wireframe-iPad" + jpg, imgResizedDEST + "wireframe-iPad-xxs" + jpeg, 414, 475.86);
        resizeImage(imgRawSRC + "wireframe-iPad" + jpg, imgResizedDEST + "wireframe-iPad-xs" + jpeg, 500, 574.7);

        console.log('IMAGES RESIZE — completed!');

    } catch (error) {
        console.log(error);
    }
})();