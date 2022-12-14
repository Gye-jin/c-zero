package com.spring.back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.back.dto.CommentDTO;
import com.spring.back.dto.SessionDTO;
import com.spring.back.service.CommentServiceImpl;

@RestController
@RequestMapping(value = "/api", produces = "application/json")
@CrossOrigin(origins = { "*" })
public class CommentController {
	// Connection
	// --------------------------------------------------------------------------------------------------------------------------------
	// [Service]
	@Autowired
	CommentServiceImpl commentService;
	
	// Create
	// --------------------------------------------------------------------------------------------------------------------------------
	// [댓글달기]
	@PostMapping(value = "/insertComment")
	public CommentDTO insertComment(@ModelAttribute SessionDTO sessionDTO, CommentDTO commentDTO) {
		return commentService.insertComment(sessionDTO,commentDTO);
	}
	// Read
	// --------------------------------------------------------------------------------------------------------------------------------
//	// [댓글 불러오기]
	@PostMapping(value = "/getComment")
	public CommentDTO getComment(@RequestBody SessionDTO sessionDTO, @RequestBody CommentDTO commentDTO) {
		return commentService.getComment(sessionDTO,commentDTO);
	}
	
	// Update
	// --------------------------------------------------------------------------------------------------------------------------------
	// [변경한 내용으로 댓글에 적용]
	@PostMapping(value = "/updateComment")
	public boolean updateComment(@ModelAttribute SessionDTO sessionDTO, CommentDTO commentDTO) {
		return commentService.updateComment(sessionDTO, commentDTO);
	}
	
	// Delete
	// --------------------------------------------------------------------------------------------------------------------------------
	// [댓글 삭제]
	// 설명 : 해당 댓글의 회원정보와 요청자의 회원정보가 같을 경우 진행
	@PostMapping(value = "/deleteComment")
	public boolean deleteComment(@ModelAttribute SessionDTO sessionDTO, CommentDTO commentDTO) {
		return commentService.deleteComment(sessionDTO, commentDTO);
	}
}
