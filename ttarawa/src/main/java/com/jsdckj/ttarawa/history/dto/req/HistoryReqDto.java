package com.jsdckj.ttarawa.history.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class HistoryReqDto {

    private int personal;
    private Long time;
    private Long distance;
    private String content;
    private String startAddress;
    private String endAddress;



}
