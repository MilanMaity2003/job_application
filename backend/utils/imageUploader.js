const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary = async(img, folder, height, quality) =>{
    const option = {folder};
    if(height){
        option.height = height;
    }
    if(quality){
        option.quality = quality;
    }
    option.resource_type = "auto";
    option.format = 'png'
    return await cloudinary.uploader.upload(img.tempFilePath, option);
}