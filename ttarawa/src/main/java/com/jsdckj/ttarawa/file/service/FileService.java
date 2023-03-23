package com.jsdckj.ttarawa.file.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface FileService {

  String uploadFile(String dirName, MultipartFile multipartFile) throws IOException;
  void deleteFile(String dirName, String fileUrl);
}
