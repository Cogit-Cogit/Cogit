package com.whitemind.cogit.common.S3.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class S3UploadService {

    private final AmazonS3 amazonS3;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String saveFile(MultipartFile multipartFile) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
        return amazonS3.getUrl(bucket, originalFilename).toString();
    }

    public void uploadToS3(String content, String fileName, String fileExtension) {
        String uploadFileName = fileName + "." + fileExtension;
        byte[] contentBytes = content.getBytes();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(contentBytes.length);
        metadata.setContentType("text/plain"); // 파일 유형에 따라 적절히 변경

        amazonS3.putObject(bucket, uploadFileName, new ByteArrayInputStream(contentBytes), metadata);
    }
}