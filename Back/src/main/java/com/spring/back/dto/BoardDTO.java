package com.spring.back.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.FetchType;
import javax.persistence.OneToMany;

import com.spring.back.entity.Board;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDTO {
	
	// Column
	// --------------------------------------------------------------------------------------------------------------------------------
	// 게시글이 내가 작성한 글인지 확인
	private boolean editor;
	private Long countComment;

	private Long boardNo;
	private String userId;
	private String boardContent;
	private LocalDate createDate;
	private LocalDate modifiedDate;	
	private Long viewCount;
	
	// Join
	// --------------------------------------------------------------------------------------------------------------------------------
	// [File Join]

	@OneToMany(fetch = FetchType.LAZY)
	private List<FileDTO> files = new ArrayList<FileDTO>();
	
	// [Comment Join]
	@OneToMany(fetch = FetchType.LAZY)
	private List<CommentDTO> comments = new ArrayList<CommentDTO>();

	// Build
	// --------------------------------------------------------------------------------------------------------------------------------
	// DtoToEntity
	// 설명 : 해당 함수는 entity로 변경해주는 과정에서  user객체로 넘겨줄 수 없기 때문에 Board에 있는 updateBoard와 함께 사용해야함
	public static  Board boardDtotoEntity(BoardDTO boardDTO) {
		Board board = Board.builder()
						   .boardNo(boardDTO.getBoardNo())
						   .boardContent(boardDTO.getBoardContent())
						   .viewCount(0L)
						   .build();
		return board;
	}
	
}
