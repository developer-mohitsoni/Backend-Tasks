const { S3 } = require("aws-sdk");

require("dotenv").config();

exports.s3Uploadv2 = async (files) => {
  const s3 = new S3();

  /*
  const param = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `uploads/${files.originalname}`,
    Body: files.buffer,
  };
  */

  //* To return and upload single file only
  //  return await s3.upload(param).promise();

  //* for two upload multiple files as:-

  const params = files.map((file) => {
    return {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(params.map(param =>{
    s3.upload(param).promise()
  }));
};
