package com.jsdckj.ttarawa.history.dto.req;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;


public class HistoryReqDto {

	@Getter
	@Setter
	@ToString
	@Builder
	public static class HistoryInfoDto {
		private int personal;
		private Long time;
		private Long distance;
		private String content;
		private String startAddress;
		private String endAddress;
		private MultipartFile image;
	}
}